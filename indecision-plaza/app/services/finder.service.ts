import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import { Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { Business } from "../entities/business";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class FinderService {
  private static readonly API_URL = "https://api.yelp.com/v3/businesses/search";
  private static readonly AUTH_URL = "https://api.yelp.com/oauth2/token";
  private auth_token: string;
  private currentLocation: Location;

  private cachedCategory: string;
  private cachedResults: Array<Business> = [];
  private refreshCache: boolean = true

  /*
   *  For more information on REST, see https://docs.nativescript.org/angular/code-samples/http
   */
  constructor(private http: Http) {
    this.getAuth().forEach(r => this.auth_token = r.access_token);

  }

  getFoodFromCache(category: string): Business {

    if (this.cachedResults.length == 0 || this.cachedCategory != category) {
      console.log("refreshing cache")
      this.cachedCategory = category;
      this.getNearbyFood(category).forEach((data) => {
        this.cachedResults = [];
        this.cachedResults = data.businesses.map((businessJSON) => new Business(businessJSON));
        if (this.cachedResults.length == 0) {
          console.log("No businesses found")
          return Business.makeEmpty();
        }
        else {
          return this.getRandomRestarauntFromCache()
        }
      });
    } else {
      // find a random restaraunt
      return this.getRandomRestarauntFromCache()
    }

  }

  private getRandomRestarauntFromCache(): Business {
    let index = Math.floor(Math.random() * this.cachedResults.length);
    let result = this.cachedResults[index]
    this.cachedResults.splice(index, 1)
    return result;
  }

  /*
   *  Find nearby places for food using Yelps Business Search API
   *
   *  For more information, see https://www.yelp.com/developers/documentation/v3/business_search
   */
  getNearbyFood(category: string) {
    this.setLocation()
    let headers = new Headers()

    headers.append("Authorization", "Bearer " + this.auth_token)
    let params = {
      "radius": "3200",
      "categories": category,
      "latitude": this.currentLocation.latitude,
      "longitude": this.currentLocation.longitude,
      "open_now": "true",
      "limit": "30"
    }
    let url = this.makeUrl(FinderService.API_URL, params)
    return this.http.get(url, { headers: headers }).map(r => r.json());
  }

  /*
   *  Leverage Yelp Auth API to get access token
   *
   *  For more information, see https://www.yelp.com/developers/documentation/v3/authentication
   */
  getAuth() {
    let authBody = {
      "client_id": "wNu2oeFkVUHt4APXLJsA0g",
      "client_secret": "5Dg2X45mGpA5wJfcd6u4rWGWLhCnCi6K6mfqBDWjrnUG1sIX8nqKs8APcRNfwQ1a"
    }
    let url = this.makeUrl(FinderService.AUTH_URL, authBody)
    let headers = new Headers();
    return this.http.post(url, {}).map(res => res.json())
  }

  /*
   *  Construct a parameterized URL for use with APIs
   */
  makeUrl(baseUrl, params) {
    return baseUrl + "?" + Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&')
  }

  /*
   *  Finds and sets the current location of the user
   *
   *  See Nativescript docs on Hardware access: https://docs.nativescript.org/angular/hardware/location
   */
  setLocation() {
    getCurrentLocation({}).then((loc) => { this.currentLocation = loc; })
      .catch((emptyPromise) => console.log(emptyPromise))
  }

}

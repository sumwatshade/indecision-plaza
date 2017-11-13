import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";
import { Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class FinderService {
  private static readonly API_URL = "https://api.yelp.com/v3/businesses/search";
  private static readonly AUTH_URL = "https://api.yelp.com/oauth2/token";
  private auth_token: string;
  private currentLocation: Location;

  constructor(private http: Http) {
    this.getAuth().forEach(r => this.auth_token = r.access_token);

  }

  getNearbyFood() {
    this.setLocation()
    let headers = new Headers()

    headers.append("Authorization", "Bearer " + this.auth_token)
    let params = {
      "radius": "3200",
      "categories": "restaurants",
      "latitude": this.currentLocation.latitude,
      "longitude": this.currentLocation.longitude,
      "open_now": "true",
      "limit": "20"
    }
    let url = this.makeUrl(FinderService.API_URL, params)
    return this.http.get(url, { headers: headers }).map(r => r.json());
  }

  getAuth() {
    let authBody = {
      "client_id": "wNu2oeFkVUHt4APXLJsA0g",
      "client_secret": "5Dg2X45mGpA5wJfcd6u4rWGWLhCnCi6K6mfqBDWjrnUG1sIX8nqKs8APcRNfwQ1a"
    }
    let url = this.makeUrl(FinderService.AUTH_URL, authBody)
    let headers = new Headers();
    return this.http.post(url, {}).map(res => res.json())
  }

  makeUrl(baseUrl, params) {
    return baseUrl + "?" + Object.keys(params).map(function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
    }).join('&')
  }

  setLocation() {
    getCurrentLocation({}).then((loc) => { this.currentLocation = loc; })
      .catch((emptyPromise) => console.log(emptyPromise))
  }

}

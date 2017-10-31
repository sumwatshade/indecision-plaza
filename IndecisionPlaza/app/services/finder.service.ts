import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class FinderService {
  private static readonly API_URL = "https://api.yelp.com/v3/businesses/search";

  constructor(private http: Http) {}

  getNearbyFood() {
    let headers = this.getAuthHeaders()

    // Add radius in meters
    headers.append("radius",3200);

    // Choose category
    headers.append("term","food");

    // Location
    headers.append("location","Rochester, NY, 14617");

    // Must be open right now
    headers.append("open_now",true)

    return this.http.get(FinderService.API_URL,{headers: headers}).map(res => res.json())
  }

  getAuthHeaders() {
    let authBody = {
      "client_id": "wNu2oeFkVUHt4APXLJsA0g",
      "client_secret": "5Dg2X45mGpA5wJfcd6u4rWGWLhCnCi6K6mfqBDWjrnUG1sIX8nqKs8APcRNfwQ1a"
    }
    let authJson = this.http.post(FinderService.API_URL,authBody).map(res => res.json());
    let headers = new Headers();
    headers.append("access_token","Bearer " + authJson.access_token)
    return headers;
  }

}

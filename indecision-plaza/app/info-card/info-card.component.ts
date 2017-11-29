import { Component, OnInit, Input } from "@angular/core";
import { Business } from "../entities/business";
import * as TNSPermissions from "nativescript-permissions"
import * as TNSPhone from "nativescript-phone"
import * as TNSUtils from "utils/utils";
declare var android;

@Component({
  selector: "info-card",
  styleUrls: ["./info-card.component.css"],
  templateUrl: "./info-card.component.html",
})
export class InfoCardComponent {
  @Input() business: Business;
  public buttonText: string;

  constructor() {
  }

  ngOnChanges() {
    this.buttonText = this.business != null && this.business != undefined ? "Website" : "";
  }

  dialNumber() {
    TNSPermissions.requestPermission(android.Manifest.permission.CALL_PHONE,
                                    "App Needs This Permission To Make Phone Calls")
    .then(() =>{
      TNSPhone.dial(this.business.phoneNumber,false)
    })
    .catch(() =>{
      console.log("Permission Denied.")
    })
  }

  openWebsite() {
    TNSUtils.openUrl(this.business.yelpURL);
  }
}

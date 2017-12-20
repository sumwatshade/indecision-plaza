import { Component, OnInit, Input } from "@angular/core";
import { Business } from "../entities/business";
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

  public openWebsite() {
    TNSUtils.openUrl(this.business.yelpURL);
  }

  public isValid(attribute) {
    return this.business != undefined && this.business != null &&
      this.business[attribute] != undefined && this.business[attribute] != null;
  }
}

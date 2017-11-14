import { Component, OnInit, Input } from "@angular/core";
import { Business } from "../entities/business";
import * as TNSPhone from "nativescript-phone"
@Component({
    selector: "info-card",
    styleUrls: ["./info-card.component.css"],
    templateUrl: "./info-card.component.html",
})
export class InfoCardComponent {
  @Input() business: Business;

  constructor() {}

  dialNumber() {
    TNSPhone.dial(this.business.phoneNumber,false)
  }
}

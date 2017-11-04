import { Component, OnInit, Input } from "@angular/core";
import { Business } from "../entities/business";
@Component({
    selector: "info-card",
    styleUrls: ["./info-card.component.css"],
    templateUrl: "./info-card.component.html",
})
export class InfoCard {
  @Input() business: Business;

  constructor() {}
}

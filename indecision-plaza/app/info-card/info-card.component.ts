import { Component, OnInit, Input } from "@angular/core";
import { Business } from "../entities/business";
@Component({
    selector: "info-card",
    styleUrls: ["./info-card/info-card.component.css"],
    templateUrl: "./info-card/info-card.component.html",
})
export class InfoCardComponent {
  @Input() business: Business;

  constructor() {}
}

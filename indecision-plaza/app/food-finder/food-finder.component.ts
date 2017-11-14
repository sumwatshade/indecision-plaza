import { Component, OnInit } from "@angular/core";
import { FinderService } from "../services/finder.service";
import { Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { Business } from "../entities/business";
@Component({
  selector: "food-finder",
  styleUrls: ["./food-finder.component.css"],
  templateUrl: "./food-finder.component.html",
})
export class FoodFinderComponent {
  public foodInfo: string = "";
  public chosenPlace: Business;
  public currentLocation: Location;
  constructor(private foodSvc: FinderService) {
    enableLocationRequest();
  }

  findFood() {
    this.foodSvc.getNearbyFood().forEach((data) => {
      // Grab the list of businesses from the JSON
      let places = data.businesses
      // Choose one random business
      let chosenPlaceJSON = places[Math.floor(Math.random() * places.length)]
      // Convert chosen business into an Entity that is read into the info card
      this.chosenPlace = new Business(chosenPlaceJSON);

      // Handles the case that no food places are found
      // TODO: Implement a Utility that can perform these checks as one function
      if (this.chosenPlace === undefined || this.chosenPlace === null)
        this.foodInfo = "No food places in your area";
      else
        this.setInfo(this.chosenPlace);
    });

  }

  setInfo(business: Business): void {
    this.foodInfo = business.toLongString();

  }

  testPrint() {
    console.log("test")
  }

  ngOnInit() {
    this.foodSvc.setLocation();
  }
}

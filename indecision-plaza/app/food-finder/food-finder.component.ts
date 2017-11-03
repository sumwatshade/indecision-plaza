import { Component, OnInit } from "@angular/core";
import { FinderService } from "../services/finder.service";
import { Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";

@Component({
    selector: "food-finder",
    styleUrls: ["./food-finder/food-finder.component.css"],
    templateUrl: "./food-finder/food-finder.component.html",
})
export class FoodFinderComponent {
  public foodInfo: string = "";
  public chosenPlace;
  public currentLocation: Location;
  constructor(private foodSvc: FinderService) {
    enableLocationRequest();
  }

  findFood(){
    this.foodSvc.getNearbyFood().forEach((data) => {
      let places = data.businesses
      this.chosenPlace = places[Math.floor(Math.random()*places.length)]
      if(this.chosenPlace === undefined || this.chosenPlace === null)
        this.foodInfo = "No food places in your area";
      else
        this.setInfo(this.chosenPlace);
    });

  }

  setInfo(business): void {
    this.foodInfo = business.name + "\n"
        + "\t" + business.location.address1 + "\n"
        + "\t" + business.location.city + ", " + business.location.state + "\n"
        + "\tRating: " + business.rating + "\n"
        + "\tPrice: " + business.price;

  }

  testPrint() {
    console.log("test")
  }

  ngOnInit() {
    this.foodSvc.setLocation();
  }
}

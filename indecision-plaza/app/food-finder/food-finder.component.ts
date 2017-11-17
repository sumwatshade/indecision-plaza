import { Component, OnInit } from "@angular/core";
import { FinderService } from "../services/finder.service";
import { Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { Business } from "../entities/business";
import { ListPicker } from "ui/list-picker";
@Component({
  selector: "food-finder",
  styleUrls: ["./food-finder/food-finder.component.css"],
  templateUrl: "./food-finder/food-finder.component.html",
})
export class FoodFinderComponent {
  public foodInfo: string = "";
  public chosenPlace: Business;
  public currentLocation: Location;

  public categories: Array<string>;
  public categoryMap: {[key: string]: string} = {};
  public chosenCategory: string;
  constructor(private foodSvc: FinderService) {
    enableLocationRequest();
    this.chosenPlace = Business.makeEmpty();
    this.categories = ["Bars","Coffee/Tea","Restaraunts","Breakfast","Fast Food"];
    this.categoryMap["Restaraunts"] = "restaraunts";
    this.categoryMap["Bars"] = "bars";
    this.categoryMap["Coffee/Tea"] = "coffee";
    this.categoryMap["Breakfast"] = "breakfast_brunch";
    this.categoryMap["Fast Food"] = "hotdogs";

  }

  findFood() {
    this.foodSvc.getNearbyFood(this.categoryMap[this.chosenCategory]).forEach((data) => {
      // Grab the list of businesses from the JSON
      let places = data.businesses

      if(places.length !== 0) {
        // Choose one random business
        let chosenPlaceJSON = places[Math.floor(Math.random() * places.length)]
        // Convert chosen business into an Entity that is read into the info card
        this.chosenPlace = new Business(chosenPlaceJSON);
        console.log(this.chosenPlace.toLongString())
      }
      else {
        this.chosenPlace = Business.makeEmpty();
        console.log("No results were found");
      }

      // Handles the case that no food places are found
      // TODO: Implement a Utility that can perform these checks as one function
      if (this.chosenPlace === undefined || this.chosenPlace === null)
        this.foodInfo = "No food places in your area";
      else
        this.setInfo(this.chosenPlace);
    });

  }

  public selectedIndexChanged(args) {
      let picker = <ListPicker>args.object;
      this.chosenCategory = this.categories[picker.selectedIndex];
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

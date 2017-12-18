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
  public chosenCategory: string = "Restaurants";
  constructor(private foodSvc: FinderService) {
    this.chosenPlace = Business.makeInit();
    this.categories = ["Bars","Coffee/Tea","Restaurants","Breakfast","Fast Food"];
    this.categoryMap["Restaurants"] = "restaurants";
    this.categoryMap["Bars"] = "bars";
    this.categoryMap["Coffee/Tea"] = "coffee";
    this.categoryMap["Breakfast"] = "breakfast_brunch";
    this.categoryMap["Fast Food"] = "hotdogs";

  }

  findFood() {
    enableLocationRequest().then(() => {
      console.log("Finding food...")
      this.chosenPlace = this.foodSvc.getFoodFromCache(this.categoryMap[this.chosenCategory])
      console.log(this.chosenPlace)
    })
    .catch((error) => {
      this.chosenPlace = Business.makeInit()
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

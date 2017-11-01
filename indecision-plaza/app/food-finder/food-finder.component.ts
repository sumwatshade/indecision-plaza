import { Component } from "@angular/core";
import { FinderService } from "../services/finder.service";

@Component({
    selector: "food-finder",
    templateUrl: "./food-finder/food-finder.component.html",
})
export class FoodFinderComponent {
  public foodInfo: string = "";
  public chosenPlace;
  constructor(private foodSvc: FinderService) { }

  findFood(){
    this.foodSvc.getNearbyFood().forEach((data) => {
      let places = data.businesses
      this.chosenPlace = places[Math.floor(Math.random()*places.length)]
      this.setInfo(this.chosenPlace)
    });

  }

  setInfo(business): void {
    this.foodInfo = business.name;
    console.log(this.foodInfo);
  }
  testPrint() {
    console.log("test")
  }
}

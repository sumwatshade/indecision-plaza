import { Component } from "@angular/core";
import { FinderService } from "../services/finder.service";

@Component({
    selector: "food-finder",
    templateUrl: "./food-finder/food-finder.component.html",
})
export class FoodFinderComponent {
  public foodOptions;
  constructor(private foodSvc: FinderService) { }

  findFood(){
    this.foodSvc.getNearbyFood().forEach((data) => {
      console.log(data.total)
      for(let foodPlace of data.businesses){
        console.log(foodPlace.name)
      }

    });

  }

  testPrint() {
    console.log("test")
  }
}

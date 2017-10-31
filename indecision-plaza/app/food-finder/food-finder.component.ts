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
    this.foodSvc.getNearbyFood().forEach((elem)=>{
      console.log(elem);
    })
  }

  testPrint() {
    console.log("test")
  }
}

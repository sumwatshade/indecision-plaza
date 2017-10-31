import { Component } from "@angular/core";
import { FinderService } from "../services/finder.service";

@Component({
    selector: "food-finder",
    templateUrl: "food-finder.component.html",
})
export class FoodFinderComponent {
  public foodOptions;
  constructor(private foodSvc: FinderService) { }

  findFood(){
    console.log(this.foodSvc.getNearbyFood())
  }
}

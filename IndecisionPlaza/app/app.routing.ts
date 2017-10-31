import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { FoodFinderComponent } from "./food-finder/food-finder.component"

const routes: Routes = [
    { path: "", redirectTo: "/food", pathMatch: "full" },
    { path: "food", component: FoodFinderComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

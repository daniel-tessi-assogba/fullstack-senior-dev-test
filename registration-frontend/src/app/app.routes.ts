import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import {TRAININGCENTERS_ROUTES} from "./training-centers/training-centers.routes";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "training-centers",
    loadChildren: () =>
      import("./training-centers/training-centers.routes").then((m) => m.TRAININGCENTERS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];

import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { TrainingCentersListComponent } from "./features/training-centers-list/training-centers-list.component";

export const TRAININGCENTERS_ROUTES: Routes = [
	{
		path: "list",
		component: TrainingCentersListComponent,
	},
	{ path: "**", redirectTo: "list" },
];

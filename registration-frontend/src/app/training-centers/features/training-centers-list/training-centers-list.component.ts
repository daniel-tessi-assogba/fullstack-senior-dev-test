import { Component, OnInit, inject, signal } from "@angular/core";
import {Training_center} from "app/training-centers/data-access/training-center.model";
import { TrainingCentersService } from "app/training-centers/data-access/training-centers.service";
import { TrainingCenterFormComponent } from "app/training-centers/ui/training-center-form/training-center-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';

const emptyTrainingCenter: Training_center = {
  id: 0,
  nom_etablissement: "",
  pole_formation: "",
  description: "",
  annee_immatriculation: "",
  adresse_siege: "",
  nom_representant: "",
  prenom_representant: "",
  telephone: "",
  types_formation: "",
  createdAt: "2025-07-04",
  updatedAt: "2025-07-04"
};

@Component({
  selector: "app-training-centers-list",
  templateUrl: "./training-centers-list.component.html",
  styleUrls: ["./training-centers-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, TrainingCenterFormComponent],
})
export class TrainingCentersListComponent implements OnInit {
  private readonly trainingCentersService = inject(TrainingCentersService);

  public readonly training_centers = this.trainingCentersService.training_centers;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedTraining_center = signal<Training_center>(emptyTrainingCenter);

  ngOnInit() {
    // @ts-ignore
    this.training_centers.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedTraining_center.set(emptyTrainingCenter);
  }

  public onUpdate(training_center: Training_center) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedTraining_center.set(training_center);
  }

  public onDelete(training_center: Training_center) {
    this.trainingCentersService.delete(training_center.id).subscribe();
  }

  public onSave(training_center: Training_center) {
    if (this.isCreation) {
      this.trainingCentersService.create(training_center).subscribe();
    } else {
      this.trainingCentersService.update(training_center).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}

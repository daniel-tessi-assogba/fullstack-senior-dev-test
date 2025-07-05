import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Training_center } from "app/training-centers/data-access/training-center.model";
import { SelectItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: "app-training-center-form",
  template: `
    <form #form="ngForm" (ngSubmit)="onSave()">
      <div class="form-field">
        <label for="name">Nom de l'école</label>
        <input pInputText
          type="text"
          id="name"
          name="name"
          [(ngModel)]="editedTraining_center().nom_etablissement"
          required>
      </div>
      <div class="form-field">
        <label for="price">Pole de formation</label>
        <p-inputNumber
          [(ngModel)]="editedTraining_center().pole_formation"
          required/>
      </div>
      <div class="form-field">
        <label for="description">Desciption</label>
        <textarea pInputTextarea
          id="description"
          name="description"
          rows="5"
          cols="30"
          [(ngModel)]="editedTraining_center().description">
        </textarea>
      </div>
      <div class="form-field">
        <label for="description">Type de formation</label>
        <p-dropdown
          name="category"
          appendTo="body"
          [options]="categories"
          [(ngModel)]="editedTraining_center().types_formation"
        />
      </div>
      <div class="flex justify-content-between">
        <p-button type="button" (click)="onCancel()" label="Annuler" severity="help"/>
        <p-button type="submit" [disabled]="!form.valid" label="Enregistrer" severity="success"/>
      </div>
    </form>
  `,
  styleUrls: ["./training-center-form.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
  ],
  encapsulation: ViewEncapsulation.None
})
export class TrainingCenterFormComponent {
  public readonly training_center = input.required<Training_center>();

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Training_center>();

  public readonly editedTraining_center = computed(() => ({ ...this.training_center() }));

  public readonly categories: SelectItem[] = [
    { value: "Informatique - Digital", label: "Informatique - Digital" },
    { value: "Arts - Design", label: "Arts - Design" },
    { value: "Management", label: "Management" },
    { value: "Communication ", label: "Communication " },
  ];

  onCancel() {
    this.cancel.emit();
  }

  onSave() {
    this.save.emit(this.editedTraining_center());
  }
}

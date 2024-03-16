import { Component } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-bat',
  templateUrl: './add-bat.component.html',
  styleUrls: ['./add-bat.component.css']
})
export class AddBatComponent {
  myForm: FormGroup;

  constructor(public suggestDataService: SuggestDataService, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      batName: ['', Validators.required],
      batType: ['', Validators.required],
      batAddr: ['', Validators.required]
    });
  }

  // Add the data in suggest-data.service
  onSubmit(): void {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      this.suggestDataService.saveBuilding(formData);
      this.myForm.reset();
    }
  }
}

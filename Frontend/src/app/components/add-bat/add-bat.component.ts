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
      batType: ['00', Validators.required],
      batAddr: ['', Validators.required]
    });
  }

  // Add the data in suggest-data.service
  onSubmit(): void {
    console.log("onSubmit");
    const formData = this.myForm.value;
    console.log(formData);
    this.suggestDataService.saveBuilding(formData);
    console.log(this.suggestDataService.getAllBuildings());
    this.myForm.reset();
  }
}

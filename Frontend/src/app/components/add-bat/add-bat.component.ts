import { Component } from '@angular/core';
import { SuggestDataService } from "../suggest-data.service";

@Component({
  selector: 'app-add-bat',
  templateUrl: './add-bat.component.html',
  styleUrls: ['./add-bat.component.css']
})
export class AddBatComponent {
  constructor(public suggestDataService: SuggestDataService) { }

  // Add the data in suggest-data.service
  onSubmit(name: string, surname: string, batName: string, buildingType: string, batAddr: string): void {
    const newBuilding: Building = {
      name: name,
      surname: surname,
      batName: batName,
      buildingType: buildingType,
      batAddr: batAddr
    };

    this.suggestDataService.saveBuilding(newBuilding);
  }
}

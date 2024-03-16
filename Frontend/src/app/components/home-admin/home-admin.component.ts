import { Component } from '@angular/core';
import { SuggestDataService } from "../suggest-data.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(public suggestDataService: SuggestDataService) { }

  buildings: Building[] = [];

  ngOnInit() {
    this.buildings = this.buildingService.getAllBuildings();
  }

  showBuildingDetails(building: Building) {
    // Afficher les détails complets du bâtiment
  }
}

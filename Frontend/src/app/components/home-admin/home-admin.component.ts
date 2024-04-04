import { Component } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { Building } from "../../building.model";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent {
  constructor(public suggestDataService: SuggestDataService) { }

  buildings: Building[] = [];
  buildingInfo: Building | null = null;

  ngOnInit() {
    this.buildings = this.suggestDataService.getAllBuildings();
  }

  getBuildingInformation(buildingName: string) {
    const info = document.getElementById("container");
    // @ts-ignore
    info.style.display = "flex";

    this.buildingInfo = this.suggestDataService.getBuilding(buildingName);
  }

  valider() {

  }

  modifier() {

  }

  annuler() {

  }
}

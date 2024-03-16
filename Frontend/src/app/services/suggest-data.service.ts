import { Injectable } from '@angular/core';
import { Building } from "../building.model";

@Injectable({
  providedIn: 'root'
})
export class SuggestDataService {

  private buildings: Building[] = [];

  constructor() {}

  // Add the building in the suggest-data.service
  addBuilding(building: Building) {
    this.buildings.push(building);
  }

  // Save the building if it doesn't exist, otherwise update it
  saveBuilding(building: Building): void {
    const existingBuildingIndex = this.buildings.findIndex(b => b.name === building.name);

    if (existingBuildingIndex !== -1) {
      this.buildings[existingBuildingIndex] = building;
    } else {
      this.addBuilding(building);
    }
  }

  // Get all the buildings from the suggest-data.service
  getAllBuildings() {
    return this.buildings;
  }
}

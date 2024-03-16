import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuggestDataService {

  private buildings: Building[] = [];

  constructor() {}

  // Save the building in the suggest-data.service
  saveBuilding(building: Building): void {
  }

  addBuilding(building: Building) {
    this.buildings.push(building);
  }

  getAllBuildings() {
    return this.buildings;
  }
}

import { Injectable } from '@angular/core';
import { Building } from "../building.model";

@Injectable({
  providedIn: 'root'
})
export class SuggestDataService {

  private buildings: Building[] = [];

  constructor() {
    this.initExampleBuildings();
  }

  private initExampleBuildings(): void {
    const exampleBuilding1: Building = {
      name: "John",
      surname: "Doe",
      batName: "Batiment1",
      batType: "Type1",
      batAddr: "Adresse1"
    };

    const exampleBuilding2: Building = {
      name: "Jane",
      surname: "Smith",
      batName: "Batiment2",
      batType: "Type2",
      batAddr: "Adresse2"
    };

    // Ajouter les bâtiments fictifs à la liste des bâtiments
    this.addBuilding(exampleBuilding1);
    this.addBuilding(exampleBuilding2);
  }

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

  // Get all buildings
  getAllBuildings(): Building[] {
    return this.buildings;
  }

  // Get all the buildings from the suggest-data.service
  getBuilding(buildingName: string): Building | null {
    const building = this.buildings.find(b => b.batName === buildingName);
    return building ? building : null;
  }
}

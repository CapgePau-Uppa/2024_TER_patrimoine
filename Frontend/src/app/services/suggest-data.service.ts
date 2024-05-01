import { Injectable } from '@angular/core';
import { Building } from "../building.model";

@Injectable({
  providedIn: 'root'
})
export class SuggestDataService {

  // Variables
  private buildings: Building[] = [];

  constructor() {}

  // Ajouter le bâtiment dans le suggest-data.service
  addBuilding(building: Building) {
    this.buildings.push(building);
  }

  // Sauvegarder le bâtiment s'il n'existe pas, sinon le mettre à jour
  saveBuilding(building: Building): void {
    const existingBuildingIndex = this.buildings.findIndex(b => b.name === building.name);

    if (existingBuildingIndex !== -1) {
      this.buildings[existingBuildingIndex] = building;
    } else {
      this.addBuilding(building);
    }
  }

  // Retourne tous les bâtiments
  getAllBuildings(): Building[] {
    return this.buildings;
  }

  // Retourne tous les bâtiments qui correspondent à la recherche
  getBuilding(buildingName: string): Building | null {
    const building = this.buildings.find(b => b.batName === buildingName);
    return building ? building : null;
  }
}

import { Component, OnInit } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { Building } from "../../building.model";
import { HomeAdminService } from './home-admin-service.model';
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{


  buildings: SuggestionDTO[] = [];
  buildingInfo: SuggestionDTO | null = null;

  constructor(private homeAdminService: HomeAdminService) { }

  ngOnInit(): void {
    this.loadAllBuildings();
  }

  loadAllBuildings(): void {
    this.homeAdminService.getAllSuggestions().subscribe((data: SuggestionDTO[]) => {
      this.buildings = data;
    });
  }

  getBuildingInformation(id: number): void {
    this.homeAdminService.getSuggestionById(id).subscribe((data: SuggestionDTO) => {
      this.buildingInfo = data;
    });
  }

  annuler() {
    throw new Error('Method not implemented.');
    }
    valider() {
    throw new Error('Method not implemented.');
    }
    modifier() {
    throw new Error('Method not implemented.');
    }


  /*buildings: Building[] = [];
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
   */
}

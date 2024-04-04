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
    const info = document.getElementById("container");
    // @ts-ignore
    info.style.display = "flex";
    this.homeAdminService.getSuggestionById(id).subscribe((data: SuggestionDTO) => {
      this.buildingInfo = data;
      console.log(this.buildingInfo); 
    });
  }
  annuler(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
        this.homeAdminService.deleteSuggestion(id).subscribe(() => {
          const info = document.getElementById("container");
          // @ts-ignore
          info.style.display = "none";
          this.loadAllBuildings();
        });
    }}

    
    valider() {
    throw new Error('Method not implemented.');
    }
    modifier() {
      const inputs = document.querySelectorAll('.form input');
      inputs.forEach(input => {
        input.removeAttribute('disabled');
      });

      
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
}

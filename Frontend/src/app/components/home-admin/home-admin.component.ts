import { Component, OnInit } from '@angular/core';
import { Building } from "../../building.model";
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';
import { HomeAdminService } from './home-admin-service.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{

  buildings: SuggestionDTO[] = [];
  buildingInfo: SuggestionDTO | null = null;
  suggestion: any = {};
  
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
  supprimer(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
        this.homeAdminService.deleteSuggestion(id).subscribe(() => {
          const info = document.getElementById("container");
          // @ts-ignore
          info.style.display = "none";
          this.loadAllBuildings();
        });
    }}

    
    valider(): void {
      if (this.buildingInfo) {
        this.homeAdminService.saveSuggestion(this.buildingInfo).subscribe(
          (data) => {
            
            console.log('Batiment enregistrée: ', data);
            if (this.buildingInfo?.id) {
              this.supprimer(this.buildingInfo.id);
            } else {
              console.error("l'id est null");
            }
            alert('Suggestion enregistrée comme un bâtiment avec succès !');
          },
          (error) => {
            console.error('Erreur lors de l\'enregistrement de la suggestion comme un bâtiment : ', error);
          }
        );
      }}
    
    modifier() {
      const inputs = document.querySelectorAll('.form input');
      inputs.forEach(input => {
        input.removeAttribute('disabled');
      });

      
    }
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
}*/

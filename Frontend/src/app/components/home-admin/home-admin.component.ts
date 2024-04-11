import { Component, OnInit } from '@angular/core';
import { Building } from "../../building.model";
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';
import { HomeAdminService } from './home-admin-service.model';
import { AddBatService } from '../add-bat/add-bat-service.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{

  buildings: SuggestionDTO[] = [];
  buildingInfo: SuggestionDTO | null = null;
  suggestion: any = {};
  types!: string[];
  statuts!: string[];
  regions!: string[];
  departements!: string[];
  communes!: string[];
  
  constructor(private homeAdminService: HomeAdminService, private addBatService : AddBatService) { }

  ngOnInit(): void {
    this.loadAllBuildings();

    //Récupération des données pour les listes déroulantes
    this.addBatService.getAllTypes().subscribe(types => this.types = types.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })).slice(5));
    this.addBatService.getAllStatuts().subscribe(statuts => this.statuts = statuts.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllRegions().subscribe(regions => this.regions = regions.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllDepartements().subscribe(departements => this.departements = departements.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllCommunes().subscribe(communes => this.communes = communes.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    
  }

  majuscule(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
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
    
      modificationActive: boolean = false;

      modifier() {
        // enlever la classe 'disabled' des champs
        this.modificationActive = !this.modificationActive;
      }

      
    

    // Etape
    etapeCourante: number = 0;

    afficherEtape(etapeIndex: number) {
      this.etapeCourante = etapeIndex;
      
    }

    etapeSuivante() {
      if (this.etapeCourante < 2) {
        this.etapeCourante++;
      }
    }

    etapePrecedente() {
      if (this.etapeCourante > 0) {
        this.etapeCourante--;
      }
    }
  }
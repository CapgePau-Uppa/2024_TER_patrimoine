import { Component, OnInit } from '@angular/core';
import { Building } from "../../building.model";
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';
import { HomeAdminService } from './home-admin-service.model';
import { AddBatService } from '../add-bat/add-bat-service.model';
import { UserDTO } from '../connexion/user-dto.model';
import { UserService } from 'src/app/services/user.service';

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
  emailAdmin: string = '';

  utilisateurConnecte!: UserDTO;
  modificationActive: boolean = false;
  historiqueMode: boolean = false;
  isSuggestionView = true;

  
  constructor(private homeAdminService: HomeAdminService, private userService: UserService,private addBatService : AddBatService) { }

  ngOnInit(): void {
    /*A revoir : il me prend le 1ere element du DTO 
    //Recuperation de informations de l'utilisateur connecté
    this.utilisateurConnecte = this.userService.getUser();
    const { nom, prenom, email } = this.utilisateurConnecte;
    this.emailAdmin = email;
    console.log('email:', this.emailAdmin);*/

    //Récupération de la liste des suggestions
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

  // Affichage des noms des suggestions dans le aside
  loadAllBuildings(): void {
    if (this.historiqueMode) {
      this.homeAdminService.getAllSuggestionsValidees().subscribe((data: SuggestionDTO[]) => {
        this.buildings = data;
      });
    } else {
      this.homeAdminService.getAllSuggestionsEnAttente().subscribe((data: SuggestionDTO[]) => {
        this.buildings = data;
      });
    }
  }

  // Affichage des informations d'une suggestion
  getBuildingInformation(id: number): void {
    const info = document.getElementById("container");
    // @ts-ignore
    info.style.display = "flex";
    this.homeAdminService.getSuggestionById(id).subscribe((data: SuggestionDTO) => {
      this.buildingInfo = data;
      console.log(this.buildingInfo); 
    });
  }

  // Suppression d'une suggestion
  supprimer(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
        this.homeAdminService.deleteSuggestion(id).subscribe(() => {
          const info = document.getElementById("container");
          // @ts-ignore
          info.style.display = "none";
          this.loadAllBuildings();
        });
    }}

  // Validation d'une suggestion (et elle l'update pour la mettre dans l'historique)
  valider(): void {
    if (this.buildingInfo) {
      this.homeAdminService.saveSuggestion(this.buildingInfo).subscribe(
        (data) => {
          console.log('Batiment enregistrée: ', data);
          if (this.buildingInfo?.id) {
            this.updateSuggestion(this.buildingInfo.id, this.emailAdmin);
            console.log("suggestion validée avec succès !");
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

  // Mise à jour de la suggestion pour la valider
  updateSuggestion(id: number, emailAdmin: string): void {
    this.homeAdminService.updateSuggestion(id, emailAdmin).subscribe(
      (data) => {
        const info = document.getElementById("container");
          // @ts-ignore
        info.style.display = "none";
        this.loadAllBuildings();
        console.log('Suggestion mise à jour avec succès : ', data);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la suggestion : ', error);
      }
    );
  }
  
  // Modification de la suggestion qui enlevera la classe 'disabled' des champs
  modifier() {
    this.modificationActive = !this.modificationActive;
  }

  // Restaurer une suggestion de l'historique vers les suggestions en attente
  restaurer() {
    if (this.buildingInfo) { 
      this.homeAdminService.restoreSuggestion(this.buildingInfo?.id).subscribe(
        (data) => {
          const info = document.getElementById("container");
          // @ts-ignore
          info.style.display = "none";
          this.loadAllBuildings();
          console.log('Suggestion restaurée avec succès : ', data);
        },
        (error) => {
          console.error('Erreur lors de la restauration de la suggestion : ', error);
        }
      );    
    }
  }
  
  /*Méthodes pour les listes de département et commune */
  // Chargement des départements en fonction de la région sélectionnée
  onRegionChange(region: string): void {
    this.addBatService.getAllDepartementsByRegion(region).subscribe(departements => {
      this.departements = departements;
    });
  }
  // Chargement des communes en fonction du département sélectionné
  onDepartementChange(departement: string): void {
    this.addBatService.getAllCommunesByDepartement(departement).subscribe(communes => {
      this.communes = communes;
    });
  }


  // Historique ou Suggestions

  switchToSuggestion() {
    console.log("Suggestions");
    this.historiqueMode = false;
    const info = document.getElementById("container");
          // @ts-ignore
    info.style.display = "none";
    this.loadAllBuildings();
    this.isSuggestionView = true;
  }

  switchToHistorique() {
    console.log("Historique");
    this.historiqueMode = true;
    const info = document.getElementById("container");
          // @ts-ignore
    info.style.display = "none";
    this.loadAllBuildings();
    this.isSuggestionView = false;
  }  
    

  // Etape
  etapeCourante: number = 0;

  afficherEtape(etapeIndex: number) {
    this.etapeCourante = etapeIndex;
    
  }

  etapeSuivante() {
    if (this.etapeCourante < 1) {
      this.etapeCourante++;
    }
  }

  etapePrecedente() {
    if (this.etapeCourante > 0) {
      this.etapeCourante--;
    }
  }

}
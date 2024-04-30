import { AfterViewInit, Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import * as L from 'leaflet';
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';
import { HomeAdminService } from './home-admin-service.model';
import { AddBatService } from '../add-bat/add-bat-service.model';
import { UserDTO } from '../connexion/user-dto.model';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BatimentDTO } from '../carte/batiment-dto.model';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
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


  //new modif
  currentRoute: string= '';
  titre: string = '';
  lien: string = '';
  showBatimentDetails = false;
  batimentDetails: BatimentDTO | undefined;
  map!: L.Map ;
  
  constructor(private homeAdminService: HomeAdminService, private userService: UserService,private addBatService : AddBatService, private router: Router, private elRef: ElementRef) { }
  

  ngOnInit(): void {
    /*A revoir : il me prend le 1ere element du DTO 
    //Recuperation de informations de l'utilisateur connecté
    this.utilisateurConnecte = this.userService.getUser();
    const { nom, prenom, email } = this.utilisateurConnecte;
    this.emailAdmin = email;
    console.log('email:', this.emailAdmin);*/
    //Ecoute de la route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split('/').pop() as string;
        console.log(this.currentRoute);
        console.log("enter router event");
        this.loadAllBuildings();
      }
    });

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
  actualiser(){
    const info = document.getElementById("container");
        // @ts-ignore
    info.style.display = "none";
    this.etapeCourante = 0;
  }
  loadAllBuildings(): void {
    if (this.currentRoute == "historique") {
      this.titre = 'Historique';
      this.homeAdminService.getAllSuggestionsValidees().subscribe((data: SuggestionDTO[]) => {
        this.buildings = data;
        console.log(this.buildings);
      });
      this.actualiser();
    } else if (this.currentRoute == "corbeille") {
      this.titre = 'Corbeille';
      this.homeAdminService.getAllSuggestionsSupprimees().subscribe((data: SuggestionDTO[]) => {
        this.buildings = data;
      });
      this.actualiser();
    } else {
      this.titre = 'Suggestion';
      this.homeAdminService.getAllSuggestionsEnAttente().subscribe((data: SuggestionDTO[]) => {
        this.buildings = data;
      });
      this.actualiser();
    }
  }
  

  // Affichage des informations d'une suggestion
  getBuildingInformation(id: number): void {
    this.actualiser();
    this.modificationActive = false;
    const info = document.getElementById("container");
    // @ts-ignore
    info.style.display = "flex";
    this.homeAdminService.getSuggestionById(id).subscribe((data: SuggestionDTO) => {
      this.buildingInfo = data;
      //const dateCreationDate = new Date(this.buildingInfo.dateCreation);
      console.log(this.buildingInfo);
      console.log(this.buildingInfo.batimentId); 
    });
    
  }

  // Suppression d'une suggestion (et elle l'update pour la mettre dans la corbeille)
  supprimer(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
        this.homeAdminService.updateSuggestionToCorbeille(id, this.emailAdmin).subscribe(
          (data) => {
            this.actualiser();
            this.loadAllBuildings();
            console.log('Suggestion supprimée avec succès : ', data);
          },
          (error) => {
            console.error('Erreur lors de la supression de la suggestion : ', error);
          }
        );
    }}

  // Validation d'une suggestion (et elle l'update pour la mettre dans l'historique)
  valider(): void {
    if (this.buildingInfo) {
      this.buildingInfo.nomBatiment = this.buildingInfo.nomBatiment;
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
          this.actualiser();
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
        this.modificationActive = true;
        this.actualiser();
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
  corriger() {
    if (this.buildingInfo) { 
      this.homeAdminService.restoreSuggestion(this.buildingInfo?.id).subscribe(
        (data) => {
          this.actualiser();
          this.loadAllBuildings();
          console.log('Suggestion restaurée avec succès : ', data);
        },
        (error) => {
          console.error('Erreur lors de la restauration de la suggestion : ', error);
        }
      );    
    }
  }

  // Restaurer une suggestion de la corbeille vers les suggestions en attente
  restaurer(): void {
    if (this.buildingInfo) { 
      this.homeAdminService.restoreSuggestionFromCorbeille(this.buildingInfo?.id).subscribe(
        (data) => {
          this.actualiser();
          this.loadAllBuildings();
          console.log('Suggestion restaurée avec succès : ', data);
        },
        (error) => {
          console.error('Erreur lors de la restauration de la suggestion : ', error);
        }
      );
    }
  }
  
  /*-------- Méthodes pour les listes de département et commune ---------*/

  // Chargement des départements en fonction de la région sélectionnée
  onRegionChange(region: string): void {
    this.buildingInfo!.commune = '';
    this.addBatService.getAllDepartementsByRegion(region).subscribe(departements => {
      this.departements = departements;
    });
  }
  // Chargement des communes en fonction du département sélectionné
  onDepartementChange(departement: string): void {
    this.buildingInfo!.commune = '';
    this.addBatService.getAllCommunesByDepartement(departement).subscribe(communes => {
      this.communes = communes;
    });
  }


  /*-------- Etape --------*/
  etapeCourante: number = 0;

  afficherEtape(etapeIndex: number) {
    this.etapeCourante = etapeIndex;
    
  }

  etapeSuivante() {
    if (this.etapeCourante < 1) {
      this.etapeCourante++;
    }
    this.onAsideItemClick();
    
  }

  etapePrecedente() {
    if (this.etapeCourante > 0) {
      this.etapeCourante--;
    }
  }


  /*-------- Carte --------*/
  onAsideItemClick(): void {
    setTimeout(() => {
      const mapContainer = this.elRef.nativeElement.querySelector('#map');
      console.log(mapContainer);
      if (mapContainer) {
        this.initMap(mapContainer);
      }
    });
  }
  
  private initMap(mapContainer: HTMLElement): void {
    const franceBounds: L.LatLngBoundsExpression = [
      [41.325, -5.0],
      [51.124, 9.662] 
    ];
    this.map = L.map(mapContainer, {
      maxBounds: franceBounds,
      maxBoundsViscosity: 1.0,
      zoomSnap: 0.1,
      minZoom: 5.5,
      maxZoom: 19
    }).fitBounds(franceBounds);

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
    });
    mainLayer.addTo(this.map);
    console.log('Carte initialisée avec succès !');

    // Ajout du marqueur seulement si les coordonnées sont présentes
    if (this.buildingInfo) {
      // Coordonnées
      const markerCoords: L.LatLngExpression = [this.buildingInfo?.lat, this.buildingInfo?.lon]; // Paris
      // Ajout du marqueur
      const marker = L.marker(markerCoords).addTo(this.map);
      // Zoom
      this.map.flyTo(markerCoords, 12);    
  }

  }


  /*-------- Details batiments si coordonnées existante --------*/

  showSidebar: boolean = false;
  

// Méthode pour basculer l'état de la sidebar
  toggleBuildingDetails(): void {
    console.log('showSidebar:', this.showSidebar);
    this.showSidebar = !this.showSidebar;
    console.log('showSidebar2:', this.showSidebar);
    this.showBatimentDetails = !this.showBatimentDetails;
    if (this.showSidebar) {
      this.getBuildingDetails();
    } else {
      this.onAsideItemClick();
    }
  }

  getBuildingDetails(): void {
    console.log('Récupération des détails du bâtiment...');
    if (this.buildingInfo) {
      const batimentId = this.buildingInfo.batimentId; // Supposons que buildingInfo contient l'ID du bâtiment
      console.log('ID du bâtiment:', batimentId);
      if (batimentId) {
        this.homeAdminService.getBatimentById(batimentId).subscribe(
          (data: BatimentDTO) => {
            this.batimentDetails = data;
            console.log(this.batimentDetails);
          },
          (error) => {
            console.error('Une erreur s\'est produite lors de la récupération des détails du bâtiment:', error);
          }
        );
      }
  }
  }
}
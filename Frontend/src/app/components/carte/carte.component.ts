import { AfterViewInit, Component, EventEmitter, OnInit, OnDestroy, booleanAttribute, HostListener, NgZone} from '@angular/core';
import * as L from 'leaflet';
import { Subscription, combineLatest } from 'rxjs';
import { BatimentDTO } from './batiment-dto.model';
import { BatimentService } from './batiment.service';
import { FilterService } from '../filters/filters-service.model';
import { AuthService, AuthState } from "../../services/auth.service";

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements AfterViewInit, OnInit{

  // Variables
  map: L.Map |undefined ;
  batiments: BatimentDTO[] = [];
  markers: any[] = [];
  departmentMarkers: any[] = [];
  buildingMarkersLayer: any;
  previousDepartmentMarker: any;
  showInstallButton: boolean = true;
  private deferredPrompt: any;
  currentAuthState: AuthState = AuthState.Visiteur;
  AuthState = AuthState;
  triggerLoad: boolean = false;
  etoiles: number[] = [1, 2, 3, 4, 5];

  private authSubscription!: Subscription;

  constructor(
    private authService: AuthService, 
    private batimentService: BatimentService, 
    private filterService: FilterService, 
    private zone: NgZone) { 
    
    /* ----- PWA ----- */
    // Installation de l'application
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton = true;
    });
  }

  // Installation de l'application
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    e.preventDefault();
    this.deferredPrompt = e;
  }

  // Installation de l'application
  async installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      this.deferredPrompt = null;
      this.showInstallButton = false;
    }
  }
 
  // Initialisation
  ngOnInit(): void {
    this.setupSubscriptions();
    this.getDisplay("degradation");

    this.authSubscription = this.authService.getAuthStateObservable().subscribe((state: AuthState) => {
      if (state === AuthState.Visiteur) {
        this.reloadMap();
      }
    });
  }

  // Création des abonnements
  setupSubscriptions(): void {
    this.batimentService.reloadMap$.subscribe(() => {
      this.reloadMap();
    }); 

    this.authService.authState$.subscribe(state => {
      this.currentAuthState = state;
    });
  }

  // Recharger la carte
  reloadMap(): void {
    this.clearMap();
    this.addClusteringMarkers();
  }

  
  /* ----- Carte ----- */

  // Initialisation de la carte
  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      this.getUserLocation();
      this.addClusteringMarkers();
    }

    // Filtre par type, departement
    combineLatest([this.batimentService.selectedType$, this.batimentService.selectedRegion$, this.batimentService.selectedDepartement$])
    .subscribe(([type, region, departement]) => {
        if (type && region) {
          this.loadBatimentsParTypeEtRegion(type, region);
        } 
        else if(type && departement) {
          this.loadBatimentsParTypeEtDepartement(type, departement);
        }
        else if (type) {
          this.loadBatimentsParType(type);
        }
        else if (region) {
          this.loadBatimentsParRegion(region);
        }
        else if (departement) {
          this.loadBatimentsParDepartements(departement);
        }
        else {
          this.buildingMarkersLayer.clearLayers();
          this.addClusteringMarkers();
        }
    });

    this.batimentService.selectedNom$.subscribe(nom => {
      if (nom) {
        this.loadBatimentsParNom(nom);
      }
      if (nom='')
      {
        this.loadBatiments();
      }
    });
  }

  // Création de la carte
  createMap() {
    const franceBounds: L.LatLngBoundsExpression = [
      [41.325, -5.0], // Sud-ouest 
      [51.124, 9.662] // Nord-est
    ];

    this.map = L.map('map', {
      maxBounds: franceBounds,
      maxBoundsViscosity: 1.0, 
      zoomSnap: 0.1, 
      minZoom: 5.5, 
      maxZoom: 19 
    }).fitBounds(franceBounds); 

    // Layer principal
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
    });
    mainLayer.addTo(this.map);

    // Layer des batiments
    this.buildingMarkersLayer = L.layerGroup().addTo(this.map);
  }

  // Géo-localisation de l'utilisateur
  getUserLocation() {
    // icone
    const menIcon = L.icon({
      iconUrl: '../assets/icones/men.png',
      iconSize: [22, 50],
      popupAnchor: [0, -30]
    });

    // Récupérer la géolocalisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        this.map!.setView([userLat, userLng], 16);

        // Ajout des markers
        L.marker([userLat, userLng], { icon: menIcon }).addTo(this.map!).bindPopup('Votre position').openPopup();

      }, error => {
        console.error('Erreur de geolocation : ', error);
      });

    } else {
      console.error("La géolocalisation n'est pas supporté par votre navigateur.");
    }
  }

  // Fonction pour afficher les marker par departements
  addClusteringMarkers(): void {
    this.batimentService.getClusteringDepartement().subscribe(data => {
      data.forEach(department => {
        let customIcon = L.divIcon({
          html: `<div class="department-marker">
                    <div class="circle" style="background-color: #FDF9EF; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; color: #262f34; font-weight: bold;">
                    ${department.count}</div>
                    <div class="department-name" style="font-size: 12px; text-align: center; color: black; font-weight: bold;">
                    ${department.departement}</div>
                 </div>`,
          className: 'custom-icon',
          iconSize: [60, 60]
        });

        let marker = L.marker([department.lat, department.lon], { icon: customIcon }).addTo(this.map!);

        marker.on('click', () => {
          this.map!.removeLayer(marker);
          this.showBuildingsByDepartment(department.departement);
          this.zoomToDepartment(marker);

          /*if (this.previousDepartmentMarker) {
            this.map!.addLayer(this.previousDepartmentMarker);
          }
          this.previousDepartmentMarker = marker;*/
        });
        this.departmentMarkers.push(marker);
      });
    });
  }

  // Afficher les batiments par departement
  private showBuildingsByDepartment(department: string): void {
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsClusteringByDepartement(department).subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }

  // Zoomer sur le département
  private zoomToDepartment(marker: any): void {
    this.map!.flyTo(marker.getLatLng(), 12);    
  }

  // Zoomer sur le bâtiment
  private zoomToBatiment(batLat: any, batLon: any): void {
    this.map!.flyTo([batLat, batLon], 18);    
  }

  // Tous les batiments
  loadBatiments(): void {
    this.batimentService.getBatiments().subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }


  /* ----- FILTRES ----- */

  // Filtre par type
  loadBatimentsParType(selectedType: string): void {
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentsByType(selectedType).subscribe(data => {
      this.batiments = data;
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      } else {
        this.map!.setZoom(6);
      }
    });
  }
  
  // Filtre par type et region
  loadBatimentsParTypeEtRegion(selectedType: string, selectedRegion: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentsByTypeAndRegion(selectedType, selectedRegion).subscribe(data => {
      this.batiments = data;
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
  }

  // Filtre par type et departement
  loadBatimentsParTypeEtDepartement(selectedType: string, selectedDepartement: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentsByTypeAndDepartement(selectedType, selectedDepartement).subscribe(data => {
      this.batiments = data;
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
  }

  // Filtre par departement
  loadBatimentsParDepartements(selectedDepartement: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentsByDepartement(selectedDepartement).subscribe(data => {
      this.batiments = data;
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
  }

  // Filtre par region
  loadBatimentsParRegion(selectedRegion: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentsByRegion(selectedRegion).subscribe(data => {
      this.batiments = data;
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
}

  // Filtre par nom
  loadBatimentsParNom(selectedNomSource: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();

    this.batimentService.getBatimentByName(selectedNomSource).subscribe(data => {
      this.batiments = data;
      
      // Vérifier si la recherche existe
      if (this.batiments.length === 0) {
        var aucunResultat =true;
        this.batimentService.setAfficherAucunResultat(aucunResultat);
        console.log("Aucun résultat trouvé");
      } else {
        var aucunResultat =false;
        this.addMarkers();

        if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
        }
        else {
          this.map!.setZoom(6);
        }
      }
    });
  }

  // Cacher la fenêtre des filtres
  hideFilters(): void {
    this.filterService.hideFilters();
  }

  batimentSelectionne: any;

  // Ajout des markers
  addMarkers(): void {
    const myIcon = L.icon({
      iconUrl: '../assets/icones/marker.png',
      iconSize: [40, 40],
      popupAnchor: [0, -30]
    });

    this.batiments.forEach((batiment, index) => {
    
      const marker = L.marker([batiment.lat, batiment.lon], {icon: myIcon}).addTo(this.buildingMarkersLayer);
  
      // Contenu de la carte
      const cardContent = `
        <h4>${batiment.nom}</h4>
        <table>
          <tr>
            <td><img src="${batiment.image}" alt="Image du batiment" style="border-radius: 20px;
                height: 90px; width: 90px;"></td>
            <td class="container" style="padding: 1px 15px;">
              <p><b>Type</b> : ${batiment.type}</p>
              <p><b>Statut</b> : ${batiment.statut} </p>
              <button id="detailsBtn${index}" 
                      style="float:right; background:none; border:none; font-weight:bold;">
                Plus de détails
              </button>
            </td>
          </tr>
        </table>
      `;
  
      // Popup
      marker.bindPopup(cardContent, { maxWidth: 500 });
      marker.bindTooltip(batiment.nom);
  
      // Tooltip
      marker.on('click', () => {
        this.zoomToBatiment(batiment.lat, batiment.lon);
        const detailButton = document.getElementById(`detailsBtn${index}`);

        if (detailButton) {
          detailButton.addEventListener('click', (e) => {
            this.togglePopup();
            e.stopPropagation();
            this.batimentSelectionne = batiment;
          });
        }
      });
  
      marker.on('mouseover', () => {
        marker.openTooltip();
      });

      marker.on('mouseout', () => {
        marker.closeTooltip();
      });
    });
  }

  // Récupérer l'affichage
  getDisplay(id: string): string | null {
    const element = document.getElementById(id);

    if (element) {
      return getComputedStyle(element).display;
    }
    return null;
  }

  // Afficher les détails du batiment
  togglePopup(): void {
    const popupContent = document.getElementById('popupContent');
    const bouton = document.getElementById('btn-add-bat');

    if (popupContent) {
      popupContent.classList.toggle('active');
      bouton?.classList.toggle('hidden');
    }
  }

  togglDegradation() {
    const degradation = document.getElementById("degradation");
    const filtersDegradation = this.getDisplay("degradation");

    // @ts-ignore
    if (filtersDegradation === "none") {
      // @ts-ignore
      degradation.style.display = "flex";
    } else {
      // @ts-ignore
      degradation.style.display = "none";
    }
  }
  
  // Fermer la fenêtre des détails
  closePopupContent(): void {
    const popupContent = document.getElementById('popupContent');
    const bouton = document.getElementById('btn-add-bat');

    if (popupContent) {
      popupContent.classList.remove('active');
      bouton?.classList.remove('hidden');
    }
  }

  // Zoommer sur la position du user
  resetView(): void {
    this.getUserLocation();
  }

  // Supprimez tous les marqueurs ou couches, sauf le fond de carte
  clearMap(): void {
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          this.map!.removeLayer(layer); 
        }
      });
    }
  }

  // Réinitialiser la liste des marqueurs de département
  removeDepartmentMarkers(): void {
    this.departmentMarkers.forEach(marker => {
      this.map!.removeLayer(marker);
    });
    this.departmentMarkers = [];
  }
}



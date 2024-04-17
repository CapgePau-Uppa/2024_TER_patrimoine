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

  
  private reloadSubscription!: Subscription;

  constructor(private authService: AuthService, private batimentService: BatimentService, private filterService: FilterService, private zone: NgZone) { 
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
    console.log("Installation de l'application"); 

    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log("L'utilisateur à accepté l'installation de l'application");
      } else {
        console.log("L'utilisateur à refusé l'installation de l'application");
      }
      this.deferredPrompt = null;
      this.showInstallButton = false;
    }
  }
 
  // Initialisation
  ngOnInit(): void {
    this.reloadSubscription = this.batimentService.reloadMap$.subscribe(() => {
      this.clearMap(); // Supprimer tous les marqueurs ou couches, sauf le fond de carte
      this.addClusteringMarkers(); // Appeler ngAfterViewInit() lorsque le sujet est déclenché
    }); 

    this.authService.authState$.subscribe(state => {
      this.currentAuthState = state;
    });
  }

  // Initialisation de la carte
  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      this.getUserLocation();
      //this.loadBatiments();
      this.addClusteringMarkers();
    }
    
    // Filtre par type, departement
    combineLatest([this.batimentService.selectedType$, this.batimentService.selectedRegion$, this.batimentService.selectedDepartement$])
      .subscribe(([type, region, departement]) => {
        if (type && region) {
          this.loadBatimentsParTypeEtRegion(type, region);
        } else if(type && departement) {
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
    /* Ancienne version : Filtre non-combiné
    this.batimentService.selectedDepartement$.subscribe(dep => {
      if (dep) {
        this.loadBatimentsParDepartements(dep);
      }if(dep='')
      {
        this.addClusteringMarkers();
      }
    });
    this.batimentService.selectedRegion$.subscribe(region => {
      if (region) {
        this.loadBatimentsParRegion(region);
      }if(region='')
      {
        this.addClusteringMarkers();
      }
    });*/
    this.batimentService.selectedNom$.subscribe(nom => {
      if (nom) {
        this.loadBatimentsParNom(nom);
      }if(nom='')
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
      maxBounds: franceBounds, // Maximum on vois la france
      maxBoundsViscosity: 1.0, 
      zoomSnap: 0.1, 
      minZoom: 5.5, 
      maxZoom: 19 
    }).fitBounds(franceBounds); 

    // Layer principale
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
    //icon
    const menIcon = L.icon({
      iconUrl: '../assets/icones/men.png',
      iconSize: [22, 50],
      popupAnchor: [0, -30]
    });

    // Get user localisation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        this.map!.setView([userLat, userLng], 16);

        // Ajout des markers
        L.marker([userLat, userLng], { icon: menIcon }).addTo(this.map!).bindPopup('Votre position').openPopup();

      }, error => {
        console.error('Geolocation error : ', error);
      });

    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // Fonction pour afficher les marker par departements
  addClusteringMarkers(): void {
    this.batimentService.getClusteringDepartement().subscribe(data => {
      data.forEach(department => {
        //let marker = L.marker([department.lat, department.lon]).addTo(this.map!);
        //marker.bindPopup(`Department: ${department.departement}<br>Number of Buildings: ${department.count}`);
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
          this.showBuildingsByDepartment(department.departement);
          this.zoomToDepartment(marker);
          if (this.previousDepartmentMarker) {
            this.map!.addLayer(this.previousDepartmentMarker);
          }
          console.log("Marker"+marker);
          console.log("Marker coordinates: ", marker.getLatLng());
          this.map!.removeLayer(marker); //Ne repond pas
          this.previousDepartmentMarker = marker;
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
      //this.zoomToDepartment(department);
    });
  }

  // Zoomer sur le département
  private zoomToDepartment(marker: any): void {
    this.map!.setView(marker.getLatLng(), 10);
  }

  // Zoomer sur le bâtiment
  private zoomToBatiment(batLat: any, batLon: any): void {
    console.log("zoom to building");
    this.map!.setView([batLat, batLon], 20);
  }

  // Tous les batiments
  loadBatiments(): void {
    this.batimentService.getBatiments().subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }

  // FILTRES : par type, par departement, par region
  // Filtre par type
  loadBatimentsParType(selectedType: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsByType(selectedType).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      this.addMarkers();
      console.log(selectedType);

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
    this.hideFilters();
  }

  // Filtre par type et region
  loadBatimentsParTypeEtRegion(selectedType: string, selectedRegion: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsByTypeAndRegion(selectedType, selectedRegion).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      console.log(selectedType);
      console.log(selectedRegion);
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
    this.hideFilters();

  }

  // Filtre par type et departement
  loadBatimentsParTypeEtDepartement(selectedType: string, selectedDepartement: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsByTypeAndDepartement(selectedType, selectedDepartement).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      console.log(selectedType);
      console.log(selectedDepartement);
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
    this.hideFilters();

  }

  // Filtre par departement
  loadBatimentsParDepartements(selectedDepartement: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsByDepartement(selectedDepartement).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      console.log(selectedDepartement);
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
    this.hideFilters();

  }

  // Filtre par region
  loadBatimentsParRegion(selectedRegion: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsByRegion(selectedRegion).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      console.log(selectedRegion);
      this.addMarkers();

      if (this.batiments.length == 1) {
        this.zoomToBatiment(this.batiments[0].lat, this.batiments[0].lon);
      }
      else {
        this.map!.setZoom(6);
      }
    });
    this.hideFilters();
  }

  // Filtre par nom
  loadBatimentsParNom(selectedNomSource: string): void{
    this.removeDepartmentMarkers();
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentByName(selectedNomSource).subscribe(data => {
      this.batiments = data;
      console.log(this.batiments);
      console.log(selectedNomSource);
      console.log("Nombre de bâtiments:", this.batiments.length);
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

  // Ajout des markers
  addMarkers(): void {
    this.batiments.forEach(batiment => {
      const marker = L.marker([batiment.lat, batiment.lon]).addTo(this.buildingMarkersLayer);

      // Contenue de la card
      const cardContent = `
        <table>
        <tr>
          <td><img src="${batiment.image}" alt="Batiment" style="border-radius: 20px 20px 20px 20px;
        height : 90px; width : 90px;"></td>
          <td class="container" style="padding: 1px 15px;">
            <h4><b>${batiment.nom}</b></h4>
            <p>Type: ${batiment.type} <br> Statut: ${batiment.statut} </p>
            <button style="float:right; background:none; border:none; font-weight:bold;">>></button>
          </td>
          </tr>
      </table>
      `;

      // Popup
      marker.bindPopup(cardContent);
      marker.bindTooltip(batiment.nom);
      //Tooltip
      marker.on('click', () => {
        marker.openPopup();
        this.zoomToBatiment(batiment.lat, batiment.lon);
      });

      marker.on('mouseover', () => {
        marker.openTooltip();
      });
      marker.on('mouseout', () => {
        marker.closeTooltip();
      });
    });
  }

  // Zoommer sur la position du user
  resetView(): void {
    console.log("back to user");
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



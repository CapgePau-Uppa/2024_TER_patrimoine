import { AfterViewInit, Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import * as L from 'leaflet';
import { BatimentDTO } from './batiment-dto.model';
import { BatimentService } from './batiment.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements AfterViewInit{

  map: L.Map |undefined ;
  batiments: BatimentDTO[] = [];
  markers: any[] = [];
  departmentMarkers: any[] = [];
  buildingMarkersLayer: any;
  previousDepartmentMarker: any;

  constructor(private batimentService: BatimentService) { }


  // Function to initialize the map
  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      this.getUserLocation();
      //this.loadBatiments();
      this.addClusteringMarkers();
    }
    this.batimentService.selectedType$.subscribe(type => {
      if (type) {
        this.loadBatimentsParType(type);
      }if(type='')
      {
        this.loadBatiments();
      }
    });
    this.batimentService.selectedDepartement$.subscribe(dep => {
      if (dep) {
        this.loadBatimentsParDepartements(dep);
      }if(dep='')
      {
        this.loadBatiments();
      }
    });
  }


  // Function to create the map
  createMap() {
    const franceBounds: L.LatLngBoundsExpression = [
      [41.325, -5.0], // South-west corner of France
      [51.124, 9.662] // North-east corner of France
    ];

    // Create the map
    this.map = L.map('map', {
      maxBounds: franceBounds, // Limit the map bounds to France
      maxBoundsViscosity: 1.0, // Ensure the bounds are respected when panning
      zoomSnap: 0.1, // Smoothly zoom to fit the bounds
      minZoom: 6, // Minimum zoom level to prevent showing other countries
      maxZoom: 19 // Maximum zoom level to prevent showing other countries when zooming out
    }).fitBounds(franceBounds); // Fit the map to the bounds of France

    // Add the main layer
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
    });

    // Add the main layer to the map
    mainLayer.addTo(this.map);

    // Add atiment layer to the map
    this.buildingMarkersLayer = L.layerGroup().addTo(this.map);


  }

  // Function to get the user location
  getUserLocation() {
    // Create the icon
    const menIcon = L.icon({
      iconUrl: '../assets/men.png',
      iconSize: [22, 50],
      popupAnchor: [0, -30]
    });

    // Get the user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        this.map!.setView([userLat, userLng], 16);

        // Add the marker
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
          if (this.previousDepartmentMarker) {
            this.map!.addLayer(this.previousDepartmentMarker);
          }
          this.map!.removeLayer(marker);
          this.previousDepartmentMarker = marker;
          this.zoomToDepartment(marker);
        });
        this.departmentMarkers.push(marker);
      });
    });
  }

  private showBuildingsByDepartment(department: string): void {
    this.buildingMarkersLayer.clearLayers();
    this.batimentService.getBatimentsClusteringByDepartement(department).subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }
  private zoomToDepartment(marker: any): void {
    this.map!.setView(marker.getLatLng(), 10);
  }


  // Function to load all batiments
  loadBatiments(): void {
    this.batimentService.getBatiments().subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }
  loadBatimentsParType(selectedType: string): void{
    this.loadBatiments();
    this.clearMap();
    this.batimentService.getBatimentsByType(selectedType).subscribe(data => {
      this.batiments = data;
      this.addMarkers();
      console.log(this.batiments);
      console.log(selectedType);
    });

  }

  loadBatimentsParDepartements(selectedDepartement: string): void{
    this.clearMap();
    this.batimentService.getBatimentsByDepartement(selectedDepartement).subscribe(data => {
      this.batiments = data;
      this.addMarkers();
      console.log(this.batiments);
      console.log(selectedDepartement);
    });

  }

  // Function to add a marker
  addMarkers(): void {
    // Add a marker for each building
    this.batiments.forEach(batiment => {
      // Create the marker
      const marker = L.marker([batiment.lat, batiment.lon]).addTo(this.buildingMarkersLayer);

      // Create the card content
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

      // Add the popup and the tooltip
      marker.bindPopup(cardContent);
      marker.bindTooltip(batiment.nom);

      // When we click on the marker, the details appear
      marker.on('click', () => {
        marker.openPopup();
      });

      // When we hover over the marker, only the name appears
      marker.on('mouseover', () => {
        marker.openTooltip();
      });

      // When we move the mouse out of the marker, the tooltip closes
      marker.on('mouseout', () => {
        marker.closeTooltip();
      });
    });
  }

  resetView(): void {
    console.log("back to user");
    this.getUserLocation();
  }
  clearMap(): void {
    if (this.map) {
      this.map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          this.map!.removeLayer(layer); // Supprimez tous les marqueurs ou couches, sauf le fond de carte
        }
      });
    }
  }

}

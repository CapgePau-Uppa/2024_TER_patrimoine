import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { BatimentDTO } from './batiment-dto.model';
import { BatimentService } from './batiment.service';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements AfterViewInit {
  map: L.Map |undefined ;
  batiments: BatimentDTO[] = [];

  constructor(private batimentService: BatimentService) { }

  // Function to initialize the map
  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      this.getUserLocation();
      this.loadBatiments();
    }
  }

  // Function to create the map
  createMap() {
    const franceCenter = {
      lat: 46.603354,
      lng: 1.888334,
    };
    const zoomLevel = 6;

    // Create the map
    this.map = L.map('map', {
      center: [franceCenter.lat, franceCenter.lng],
      zoom: zoomLevel
    });

    // Add the main layer
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
    });

    // Add the main layer to the map
    mainLayer.addTo(this.map);

    // Add a marker
    const marker = L.marker([43.32299343757268, -0.37960487089050216]).addTo(this.map!);

    /*// When we click on the marker, the details appear
    marker.on('click', () => {
      //marker.openPopup();
      console.log("Marker clicked")
      const details = document.getElementById("details");
      // @ts-ignore
      details.style.display = "block";
    });*/

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

  // Function to load the buildings
  loadBatiments(): void {
    // Get the buildings
    this.batimentService.getBatiments().subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }

  // Function to add a marker
  addMarkers(): void {
    // Add a marker for each building
    this.batiments.forEach(batiment => {
      // Create the marker
      const marker = L.marker([batiment.lat, batiment.lon]).addTo(this.map!);

      // Create the card content
      const cardContent = `
        <div class="card">
          <img src="${batiment.image}" class="card-img-top" alt="Batiment">
          <div class="card-body">
            <h5 class="card-title" style="text-align : center">${batiment.nom}</h5>
            <p class="card-text">Type: ${batiment.type}</p>
            <p class="card-text">Statut: ${batiment.statut}</p>
          </div>
        </div>
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

}

import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css']
})
export class CarteComponent implements AfterViewInit {
  map: L.Map | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      // this.addMonuments();
      this.getUserLocation();
    }
  }

  // Creation of the map with the coordinates of France
  createMap() {
    const franceCenter = {
      lat: 46.603354,
      lng: 1.888334,
    };

    // Initial zoom level of the map
    const zoomLevel = 6;

    // Creation of the Leaflet map
    this.map = L.map('map', {
      center: [franceCenter.lat, franceCenter.lng], // Centering on France
      zoom: zoomLevel
    });

    // Adding an OpenStreetMap layer
    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
      // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);
  }

  // Adding a monument using these coordinates
  /*addMonuments() {
    const monuments = [
      { name: 'Tour Eiffel', lat: 48.8584, lng: 2.2945 },
      { name: 'Basilique Saint-Sernin', lat: 43.6047, lng: 1.4432 },
      { name: 'Château de Pau', lat: 43.2988, lng: -0.3707 }
    ];

    // Marker
    monuments.forEach(monument => {
      L.marker([monument.lat, monument.lng]).addTo(this.map!).bindPopup(monument.name).openPopup();
    });
  }*/



  // Get the user's position
  getUserLocation() {
    const menIcon = L.icon({
      iconUrl: '../assets/men.png',
      iconSize:     [22, 50], // width, height
      popupAnchor:  [0, -30]
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Centering on the position
        this.map!.setView([userLat, userLng], 16); // 16 = level of zoom

        L.marker([userLat, userLng], {icon: menIcon}).addTo(this.map!).bindPopup('Your position').openPopup();

        }, error => {
        console.error('Geolocation error : ', error);
      });

    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}

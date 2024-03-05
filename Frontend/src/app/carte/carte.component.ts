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

  ngAfterViewInit(): void {
    if (typeof this.map === 'undefined') {
      this.createMap();
      this.getUserLocation();
      this.loadBatiments();
    }
  }

  createMap() {
    const franceCenter = {
      lat: 46.603354,
      lng: 1.888334,
    };

    const zoomLevel = 6;

    this.map = L.map('map', {
      center: [franceCenter.lat, franceCenter.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 2,
      maxZoom: 19,
    });

    mainLayer.addTo(this.map);

    const marker = L.marker([43.32299343757268, -0.37960487089050216]).addTo(this.map!);

    /*//lorsqu'on clique des details apparaissent
    marker.on('click', () => {
      //marker.openPopup();
      console.log("Marker clicked")
      const details = document.getElementById("details");
      // @ts-ignore
      details.style.display = "block";
    });*/

  }

  getUserLocation() {
    const menIcon = L.icon({
      iconUrl: '../assets/men.png',
      iconSize: [22, 50],
      popupAnchor: [0, -30]
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        this.map!.setView([userLat, userLng], 16);

        L.marker([userLat, userLng], { icon: menIcon }).addTo(this.map!).bindPopup('Votre position').openPopup();

      }, error => {
        console.error('Geolocation error : ', error);
      });

    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadBatiments(): void {
    this.batimentService.getBatiments().subscribe(data => {
      this.batiments = data;
      this.addMarkers();
    });
  }

  addMarkers(): void {
    this.batiments.forEach(batiment => {
      const marker = L.marker([batiment.lat, batiment.lon]).addTo(this.map!);

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

      marker.bindPopup(cardContent);
      marker.bindTooltip(batiment.nom);

      //lorsqu'on clique des details apparaissent
      marker.on('click', () => {
        marker.openPopup();
      });

      //en survole que le nom
      marker.on('mouseover', () => {
        marker.openTooltip();
      });

      marker.on('mouseout', () => {
        marker.closeTooltip();
      });
    });
  }

}

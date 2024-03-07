<<<<<<< Updated upstream:Frontend/src/app/filters/filters.component.ts
import {Component, EventEmitter, Output} from '@angular/core';
=======
import {Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from './filters-service.model';
import { BatimentService } from '../carte/batiment.service';
>>>>>>> Stashed changes:frontend-angular/src/app/filters/filters.component.ts

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
<<<<<<< Updated upstream:Frontend/src/app/filters/filters.component.ts
export class FiltersComponent {
=======

export class FiltersComponent implements OnInit{
>>>>>>> Stashed changes:frontend-angular/src/app/filters/filters.component.ts
  hideFilters() {
    const filtersWindow = document.getElementById("filters-window");
    // @ts-ignore
    filtersWindow.style.display = "none";
  }
<<<<<<< Updated upstream:Frontend/src/app/filters/filters.component.ts
}
=======
  clearSelection(): void {
    this.selectedType = ''; // Réinitialisez la valeur de la sélection à une chaîne vide
    this.selectedDepartement = '';
    this.selectedRegion = '';
  }


  
  regions: string[] = [];
  departements: string[] = []; // Initialisation de la propriété departements
  communes: string[] = [];
  types: string[] = [];
  @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() departementSelected: EventEmitter<string> = new EventEmitter<string>();


  selectedRegion: string = '';
  selectedDepartement: string = '';
  selectedCommune: string = '';
  selectedType: string = '';

  constructor(private filterService: FilterService, private batimentService: BatimentService) { }

  ngOnInit(): void {
    this.filterService.getAllTypes().subscribe(types => this.types = types);
    this.filterService.getAllRegions().subscribe(regions => this.regions = regions);
    this.filterService.getAllDepartements().subscribe(departements => this.departements = departements);
    this.filterService.getAllCommunes().subscribe(communes => this.communes = communes);
  }

  

  onTypeSelected(): void {
    if (this.selectedType !== null) { // Vérifiez si la valeur est différente de null
      this.batimentService.setSelectedType(this.selectedType);
    }
  }

  onDepartementSelected(): void {
    if (this.selectedDepartement !== null) {
      this.batimentService.setSelectedDepartement(this.selectedDepartement);
    }
  }

  

}

>>>>>>> Stashed changes:frontend-angular/src/app/filters/filters.component.ts

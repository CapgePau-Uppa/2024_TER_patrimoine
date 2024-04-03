import {Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from './filters-service.model';
import { BatimentService } from '../carte/batiment.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit{
  hideFilters() {
    const filtersWindow = document.getElementById("filters-window");
    // @ts-ignore
    filtersWindow.style.display = "none";
  }
  clearSelection(): void {
    this.selectedType = ''; // Réinitialisez la valeur de la sélection à une chaîne vide
    this.selectedDepartement = '';
    this.selectedRegion = '';
  }



  regions: string[] = [];
  departements: string[] = []; // Initialisation de la propriété departements
  types: string[] = [];
  @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() departementSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() regionSelected: EventEmitter<string> = new EventEmitter<string>();


  selectedRegion: string = '';
  selectedDepartement: string = '';
  selectedType: string = '';

  constructor(private filterService: FilterService, private batimentService: BatimentService) { }

  ngOnInit(): void {
    this.filterService.getAllTypes().subscribe(types => this.types = types);
    this.filterService.getAllRegions().subscribe(regions => this.regions = regions);
    this.filterService.getAllDepartements().subscribe(departements => this.departements = departements);
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

  onRegionSelected(): void {
    if (this.selectedRegion !== null) {
      this.batimentService.setSelectedRegion(this.selectedRegion);
    }
  }



}


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
  
  // Supprimer la sélection
  clearSelection(menu: string): void {
    switch (menu) {
      case 'type':
        this.selectedType = '';
        this.batimentService.setSelectedType(null);
        break;

      case 'region':
        this.selectedRegion = '';
        this.batimentService.setSelectedRegion(null);
        break;

      case 'departement':
        this.selectedDepartement = '';
        this.batimentService.setSelectedDepartement(null);
        break;

      case 'all':
        this.selectedType = '';
        this.batimentService.setSelectedType(null);
        this.selectedRegion = '';
        this.batimentService.setSelectedRegion(null);
        this.selectedDepartement = '';
        this.batimentService.setSelectedDepartement(null);
        this.hideFilters();
        break;

      default:
        break;
    }
  }

  regions: string[] = [];
  departements: string[] = []; 
  types: string[] = [];

  // Event emitter pour envoyer les valeurs sélectionnées
  @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() departementSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() regionSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedRegion: string = '';
  selectedDepartement: string = '';
  selectedType: string = '';

  constructor(private filterService: FilterService, private batimentService: BatimentService) { }

  // Initialisation des filtres
  ngOnInit(): void {
    this.filterService.getAllTypes().subscribe(types => this.types = types.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })).slice(5));
    this.filterService.getAllRegions().subscribe(regions => this.regions = regions.sort());
    this.filterService.getAllDepartements().subscribe(departements => this.departements = departements.sort());
  }

  // Mettre une majuscule à la première lettre
  majuscule(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Cacher les filtres
  hideFilters() {
    this.filterService.hideFilters();
  }

  // Valider les filtres
  valider() {
    this.batimentService.setSelectedType(this.selectedType);
    this.batimentService.setSelectedDepartement(this.selectedDepartement);
    this.batimentService.setSelectedRegion(this.selectedRegion);
    
    // Cacher les filtres
    this.hideFilters();
  }

  // Envoyer le type sélectionné
  onTypeSelected(): void {
    this.batimentService.setSelectedType(this.selectedType);
  }

  // Envoyer le département sélectionné
  onDepartementSelected(): void {
      this.batimentService.setSelectedDepartement(this.selectedDepartement);
  }

  // Envoyer la région sélectionnée
  onRegionSelected(): void {
      this.batimentService.setSelectedRegion(this.selectedRegion);
  }
}


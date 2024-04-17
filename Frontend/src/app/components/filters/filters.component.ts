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
  
  clearSelection(menu: string): void { //Annuler
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
        //this.batimentService.triggerMapReload(); //Sert pour le rechargement de la page (à utiliser plus tard mais pas ici)
        break;
      default:
        break;
    }
  }

  regions: string[] = [];
  departements: string[] = []; 
  types: string[] = [];

  // event emitter pour envoyer les valeurs sélectionnées
  @Output() typeSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() departementSelected: EventEmitter<string> = new EventEmitter<string>();
  @Output() regionSelected: EventEmitter<string> = new EventEmitter<string>();

  selectedRegion: string = '';
  selectedDepartement: string = '';
  selectedType: string = '';

  constructor(private filterService: FilterService, private batimentService: BatimentService) { }

  ngOnInit(): void {
    this.filterService.getAllTypes().subscribe(types => this.types = types.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })).slice(5));
    this.filterService.getAllRegions().subscribe(regions => this.regions = regions.sort());
    this.filterService.getAllDepartements().subscribe(departements => this.departements = departements.sort());
  }
  // Mettre une majuscule à la première lettre
  majuscule(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
  hideFilters() {
    this.filterService.hideFilters();
  }

  onTypeSelected(): void {
      this.batimentService.setSelectedType(this.selectedType);
  }

  onDepartementSelected(): void {
      this.batimentService.setSelectedDepartement(this.selectedDepartement);
  }

  onRegionSelected(): void {
      this.batimentService.setSelectedRegion(this.selectedRegion);
  }

  valider() {
    this.onTypeSelected();
    this.onDepartementSelected();
    this.onRegionSelected();
    this.hideFilters();
  }

  

}


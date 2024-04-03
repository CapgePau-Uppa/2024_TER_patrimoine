import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GlobalService } from "../../services/global.service";
import { BatimentService } from '../carte/batiment.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  //Pour le filtre rechercher
  @Output() nomRechercher: EventEmitter<string> = new EventEmitter<string>();
  selectedNomSource: string = '';
  afficherAucunResultat: boolean = false;
  placeholderText: string = "Rechercher...";

// Utilisez une référence locale pour accéder à l'entrée
  @ViewChild('rechercheInput') rechercheInput!: ElementRef<HTMLInputElement>;

  constructor(public globalService: GlobalService, private batimentService: BatimentService) {
    this.placeholderText = "Rechercher...";
    
  }

  ngOnInit(): void {
    this.getDisplay("filters-window");
    this.getDisplay("menu");
    this.toggleStatut();
  }

  // Barre de recherche
  rechercher(): void {
    if (this.selectedNomSource !== null) { 
      this.batimentService.setSelectedNom(this.selectedNomSource);

    }
    // Afficher le message d'erreur si aucun résultat n'est trouvé
    this.batimentService.afficherAucunResultat$.subscribe((value) => {
      if (value) {
        this.rechercheInput.nativeElement.value = ''; 
        this.placeholderText = 'Aucun résultat trouvé... Veuillez réessayer.' ;
      } else {
        this.placeholderText = 'Rechercher...';
      }
  });
  }

  getDisplay(id: string): string | null {
    const element = document.getElementById(id);

    if (element) {
      return getComputedStyle(element).display;
    }
    return null;
  }

  toggleStatut() {
    let connection = this.globalService.isConnected;
    let statut = this.globalService.globalVariable;

    if (!connection) {
    }

    else {
      if (statut === 1) {  // user
        const searchBar = document.getElementById("searchBar");
        // @ts-ignore
        searchBar.style.display = "flex";

        const optAccount = document.getElementById("opt-account");
        // @ts-ignore
        optAccount.style.display = "flex";

        const btnConnect = document.getElementById("btn-connect");
        // @ts-ignore
        btnConnect.style.display = "none";

        const btnBat = document.getElementById("btn-add-bat");
        // @ts-ignore
        btnBat.style.display = "block";
      } else if (statut === 2) {  // admin
        const optSuggest = document.getElementById("opt-suggest");
        // @ts-ignore
        optSuggest.style.display = "flex";

        const optAccount = document.getElementById("opt-account");
        // @ts-ignore
        optAccount.style.display = "flex";

        const btnConnect = document.getElementById("btn-connect");
        // @ts-ignore
        btnConnect.style.display = "none";
      }
    }
  }

  toggleFilters() {
    const filtersWindow = document.getElementById("filters-window");
    const filtersDisplay = this.getDisplay("filters-window");

    // @ts-ignore
    if (filtersDisplay === "none") {
      // @ts-ignore
      filtersWindow.style.display = "block";
    } else {
      // @ts-ignore
      filtersWindow.style.display = "none";
    }
  }

  toggleMenu() {
    const menu = document.getElementById("menu");
    const menuDisplay = this.getDisplay("menu");

    // @ts-ignore
    if (menuDisplay === "none") {
      // @ts-ignore
      menu.style.display = "flex";
    } else {
      // @ts-ignore
      menu.style.display = "none";
    }
  }
}

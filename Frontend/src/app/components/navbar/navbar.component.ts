import { Component, ElementRef, EventEmitter, Output, ViewChild, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AuthService, AuthState } from "../../services/auth.service";
import { BatimentService } from '../carte/batiment.service';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // Variables
  currentAuthState: AuthState = AuthState.Visiteur;
  private authStateSubscription: Subscription;
  AuthState = AuthState;

  // Pour le filtre rechercher
  @Output() nomRechercher: EventEmitter<string> = new EventEmitter<string>();
  selectedNomSource: string = '';
  afficherAucunResultat: boolean = false;
  placeholderText: string = "Rechercher...";

  // Utilisez une référence locale pour accéder à l'entrée
  @ViewChild('rechercheInput') rechercheInput!: ElementRef<HTMLInputElement>;

  constructor (
    private authService: AuthService, 
    private batimentService: BatimentService, 
    private router: Router, 
    private cdRef: ChangeDetectorRef
  ) {
    this.placeholderText = "Rechercher..."; 
    this.authStateSubscription = new Subscription();
  }

  // Initialisation
  ngOnInit(): void {
    this.getDisplay("filters-window");
    this.getDisplay("menu");

    this.authStateSubscription = this.authService.authState$.subscribe(
      (state) => {
        this.currentAuthState = state;
        this.cdRef.detectChanges();
      }
    );
  }

  // Désabonnement
  ngOnDestroy() {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
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

  // Récupérer l'affichage
  getDisplay(id: string): string | null {
    const element = document.getElementById(id);

    if (element) {
      return getComputedStyle(element).display;
    }
    return null;
  }

  // Méthode pour afficher les filtres
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

  // Méthode pour afficher le menu
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

  // Méthode pour déconnecter l'utilisateur
  deconnexion() {
    console.log("Déconnexion");
    this.authService.deconnexion();
  }
}

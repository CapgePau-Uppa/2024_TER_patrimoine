import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarComponent} from "../navbar/navbar.component";


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  identifiant: string = '';
  mdp: string = '';

  constructor( private navbarComponent: NavbarComponent, private router: Router ) {
    console.log('ConnexionComponent');
  }

  valider() {
    const identifiantElement = document.getElementById('identifiant');
    const mdpElement = document.getElementById('mdp');

    // Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      //this.navbarComponent.toggleStatut(1);
      this.router.navigate(['']);

    } else {
      if (!this.identifiant) {
        // @ts-ignore
        identifiantElement.innerHTML = 'Veuillez saisir un identifiant';
      }
      if (!this.mdp) {
        // @ts-ignore
        mdpElement.innerHTML = 'Veuillez saisir un mot de passe';
      }
    }
  }

  annuler() {
    this.identifiant = '';
    this.mdp = '';
  }
}

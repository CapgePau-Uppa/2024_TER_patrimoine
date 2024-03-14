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

  constructor( private navbar: NavbarComponent, private router: Router ) {
    console.log('ConnexionComponent');
  }

  valider() {

    // Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      //this.navbarComponent.toggleStatut(1);
      this.router.navigate(['']);

    } else {
      if (!this.identifiant) {
        alert('Identifiant manquant');
      }
    }
  }

  annuler() {
    // Réinitialiser les valeurs des champs d'entrée ou effectuer d'autres actions d'annulation
    this.identifiant = '';
    this.mdp = '';
  }


}

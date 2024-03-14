import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';


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
    const identifiantElement = document.getElementById('identifiant');
    const mdpElement = document.getElementById('mdp');

    // Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      this.navbar.toggleStatus(1);

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

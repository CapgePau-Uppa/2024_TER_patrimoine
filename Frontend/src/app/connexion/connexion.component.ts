import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "../global.service";


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  identifiant: string = '';
  mdp: string = '';

  //private navbar: NavbarComponent,
  constructor( private router: Router, public globalService: GlobalService) {

    console.log('ConnexionComponent');
  }

  valider() {
    this.globalService.globalVariable = 1;
    console.log('global variable : ' + this.globalService.globalVariable);
    //this.router.navigate("../");

    /*// Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      //this.navbarComponent.toggleStatut(1);
      this.router.navigate(['']);

    } else {
      if (!this.identifiant) {
        alert('Identifiant manquant');
      }
    }*/
  }

  annuler() {
    // Réinitialiser les valeurs des champs d'entrée ou effectuer d'autres actions d'annulation
    this.identifiant = '';
    this.mdp = '';
  }


}

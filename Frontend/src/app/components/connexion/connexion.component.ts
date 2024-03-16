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
    console.log('constructor, id : ' + this.identifiant + ', mdp : ' + this.mdp);
  }

  valider() {
    const message = document.getElementById("message");
    console.log('valider, id : ' + this.identifiant + ', mdp : ' + this.mdp);

    // Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      console.log("validate");
      // @ts-ignore
      message.innerHTML = '';


      this.globalService.globalVariable = 2;
      console.log('global variable : ' + this.globalService.globalVariable);

      this.router.navigate(['../']);

    } else {
      console.log("error");
      // @ts-ignore
      message.innerHTML = '*Les deux champs sont requis.';
    }
  }

  annuler() {
    // Réinitialiser les valeurs des champs d'entrée ou effectuer d'autres actions d'annulation
    this.identifiant = '';
    this.mdp = '';
  }


}

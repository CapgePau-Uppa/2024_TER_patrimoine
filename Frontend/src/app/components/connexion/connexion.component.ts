import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "../../services/global.service";


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
  }

  valider(role: number) {
    const message = document.getElementById("message");

    // Vérifiez si les champs sont remplis
    if (this.identifiant && this.mdp) {
      console.log("validate");
      // @ts-ignore
      message.innerHTML = '';

      if (role == 1) {
        // Connexion d'un utilisateur
        this.globalService.globalVariable = 1;
        this.router.navigate(['../']);
      }
      else {
        //Connexion d'un administrateur
        this.globalService.globalVariable = 2;
        this.router.navigate(['../home-admin']);
      }

    } else {
      // @ts-ignore
      message.innerHTML = '*Les deux champs sont requis.';
    }
  }
}

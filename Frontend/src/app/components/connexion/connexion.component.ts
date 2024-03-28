import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "../../services/global.service";
import {ConnexionService} from "./connexion.service";
import { UserDTO } from './user-dto.model';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent {

  email: string = '';
  mdp: string = '';
  message: string = '';

  constructor(
    private router: Router,
    private connexionService: ConnexionService,
    public globalService: GlobalService
  ) {}


  valider(): void {
    const userDTO: UserDTO = {
      email: this.email,
      mdp: this.mdp,
      role: '',
      id: 0,
      nom: '',
      prenom: ''
    };

    this.connexionService.login(userDTO).subscribe(
      response => {
        this.globalService.isConnected = true;
        this.router.navigate(['../home-admin']);
        console.log('Connexion réussie', response);
      },
      error => {
        // Gérer les erreurs de connexion ici
        console.error('Erreur de connexion', error);
      }
    );
  }

  /*valider() {
    // Vérifiez si les champs sont remplis
    console.log("validate2");


    /*if (this.identifiant == "fatoumamhdi@gmail.com" && this.mdp == "123456") {
      this.globalService.globalVariable = 2;
      this.globalService.isConnected = true;
      this.router.navigate(['../home-admin']);
    }

    if (this.identifiant == "sabr.lavergne@gmail.com" && this.mdp == "123456") {
      this.globalService.globalVariable = 1;
      this.globalService.isConnected = true;
      this.router.navigate(['../']);
    }*/


    /*if (this.identifiant && this.mdp) {
      console.log("validate");
      this.message = '';
      this.connexionService.getConnexion().subscribe(
        (data) => {
          const role = "USER";

          if (role === "USER") {
            // Connexion d'un utilisateur
            this.globalService.globalVariable = 1;
            this.globalService.isConnected = true;
            this.router.navigate(['../']);
          } else if (role === "ADMIN") {
            // Connexion d'un administrateur
            this.globalService.globalVariable = 2;
            this.globalService.isConnected = true;
            this.router.navigate(['../home-admin']);
          } else {
            // Rôle non reconnu
            this.message = '*Rôle non reconnu.';
          }
        },
        (error) => {
          // Gérez les erreurs ici
          console.error(error);
          this.message = '*Une erreur s\'est produite lors de la connexion.';
        }
      );
    } else {
      this.message = '*Les deux champs sont requis.';
    }
  }
  */
}


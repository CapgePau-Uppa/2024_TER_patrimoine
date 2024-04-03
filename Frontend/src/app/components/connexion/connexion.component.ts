import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "../../services/global.service";
import {ConnexionService} from "./connexion.service";
import { UserDTO } from './user-dto.model';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})

export class ConnexionComponent implements OnInit{

  model: any = {};
  getData!:boolean;
  model2: any = {};
  role!: string;

  constructor(
    private router: Router,
    private connexionService: ConnexionService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
 }


  // Connexion
  valider(){
    // Verifier si aucun champs est vide :
    if (!this.model.email || !this.model.mdp) {
      this.model.message= 'Veuillez remplir tous les champs';
      return;
    }

    var email = this.model.email;
    var mdp = this.model.mdp;
    
    console.log(email+""+mdp);

    this.connexionService.connexion(email,mdp).subscribe((res: boolean): void => {
      this.getData= res; // Si res=true alors la personne ce connecte sinon le mdp ou le email n'est pas le bon
      console.log(res);
      if (this.getData==true) {
        //Recherche du role pour rediriger sur la bonne page
        this.connexionService.getRoleByEmail(email).subscribe(
          response => {
            this.role = response.role;
            console.log('Rôle de l\'utilisateur :', this.role);
          if (this.role === 'ADMIN') {
            this.router.navigate(['../home-admin']);
          } else if (this.role === 'USER') {
            this.router.navigate(['../']);
          }
        }, (error) => {
          console.error('Erreur lors de la récupération du rôle :', error);
        });       
      }else{
        this.model.message="Email ou Mot de Passe incorrecte";
      }
    },
    (error) => {
      console.error('Une erreur s\'est produite :', error);
    }
    )
  }

  //Inscritpion
  validerInscription() {
    
    // Verifier si aucun champs est vide :
    if (!this.model2.nom || !this.model2.prenom || !this.model2.email || !this.model2.mdp) {
      this.model2.message= 'Veuillez remplir tous les champs';
      return;
    }
    var nom = this.model2.nom;
    var prenom = this.model2.prenom;
    var email= this.model2.email;
    var mdp = this.model2.mdp;

    this.connexionService.inscription(nom, prenom, email, mdp).subscribe(
      response => {
        console.log('Inscription réussie', response);
        this.router.navigate(['../']);
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
        //Utilisateur déja existant
        if (error.error && error.error.error) {
          this.model2.message = error.error.error;
        } else {
          this.model2.message = 'Une erreur s\'est produite lors de l\'inscription.';
        }
      }
    );
  }

    //Permet de gérer les cards de la vue connexion
    @ViewChild('container') container!: ElementRef;
    @ViewChild('overlay') overlay!: ElementRef;
  
    card_inscription() {
      this.container.nativeElement.classList.add('right-panel-active');
    }
  
    card_connexion() {
      this.container.nativeElement.classList.remove('right-panel-active');
    }
  
  //Solution qui ne marche pas
/* 
  valider(): void {
    const userDTO: UserDTO = {
      email: this.email,
      mdp: this.mdp,
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
*/
  //Test pour voir la page de connexion
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


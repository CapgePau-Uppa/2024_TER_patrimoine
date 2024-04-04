import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from "../../services/global.service";
import { ConnexionService } from "./connexion.service";
import { UserDTO } from './user-dto.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  model: any = {};
  getData!: boolean;
  model2: any = {};
  role!: string;

  constructor(
    private router: Router,
    private connexionService: ConnexionService,
    public globalService: GlobalService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  // Connexion
  valider() {
    // Vérifier si aucun champ n'est vide :
    if (!this.model.email || !this.model.mdp) {
      this.model.message = 'Veuillez remplir tous les champs';
      return;
    }

    const email = this.model.email;
    const mdp = this.model.mdp;

    console.log(email + '' + mdp);

    this.connexionService.connexion(email, mdp).subscribe((res: boolean): void => {
      this.getData = res;
      console.log(res);
      if (this.getData === true) {
        this.connexionService.getRoleByEmail(email).subscribe(
          response => {
            this.role = response.role;
            console.log('Rôle de l\'utilisateur :', this.role); 
            if (this.role === 'ADMIN') {
              this.globalService.globalVariable = 2;
              this.globalService.isConnected = true;
              this.router.navigate(['../home-admin']);
            } else if (this.role === 'USER') {
              this.globalService.globalVariable = 1;
              this.globalService.isConnected = true;
              this.router.navigate(['../']);
            }
            // Enregistrer les informations de l'utilisateur connecté
            this.connexionService.getUserByEmail(email).subscribe(
              response => {
                const utilisateurConnecte: UserDTO = new UserDTO(response.nom, response.prenom, email, '');
                this.userService.setUser(utilisateurConnecte);
                console.log(utilisateurConnecte)
              }, (error) => {
                console.error('Erreur lors de la récupération du rôle :', error);
              });
          }, (error) => {
            console.error('Erreur lors de la récupération du rôle :', error);
          });
      } else {
        this.model.message = 'Email ou Mot de Passe incorrecte';
      }
    }, (error) => {
      console.error('Une erreur s\'est produite :', error);
    });
  }

  // Inscription
  validerInscription() {
    // Vérifier si aucun champ n'est vide :
    if (!this.model2.nom || !this.model2.prenom || !this.model2.email || !this.model2.mdp) {
      this.model2.message = 'Veuillez remplir tous les champs';
      return;
    }

    const nom = this.model2.nom;
    const prenom = this.model2.prenom;
    const email = this.model2.email;
    const mdp = this.model2.mdp;

    this.connexionService.inscription(nom, prenom, email, mdp).subscribe(
      response => {
        console.log('Inscription réussie', response);
        const utilisateurConnecte: UserDTO = new UserDTO(nom, prenom, email, '');
        this.userService.setUser(utilisateurConnecte);
        this.globalService.globalVariable = 1;
        this.globalService.isConnected = true;
        this.router.navigate(['../']);
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
        if (error.error && error.error.error) {
          this.model2.message = error.error.error;
        } else {
          this.model2.message = 'Une erreur s\'est produite lors de l\'inscription.';
        }
      }
    );
  }

  // Gérer les cards de la vue connexion
  @ViewChild('container') container!: ElementRef;
  @ViewChild('overlay') overlay!: ElementRef;

  card_inscription() {
    this.container.nativeElement.classList.add('right-panel-active');
  }

  card_connexion() {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  
}

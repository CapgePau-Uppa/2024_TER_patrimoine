export class UserDTO {
    email: string;
    mdp: string;
    nom: string;
    prenom: string;

  
    constructor(nom: string, prenom: string, email: string, mdp: string) {
      this.email= email;
      this.nom = nom;
      this.prenom= prenom;
      this.mdp= mdp;
    }
  }
  
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDTO } from '../components/connexion/user-dto.model';

// Enumération des états de l'authentification
export enum AuthState {
  Visiteur = 0,
  User = 1,
  Admin = 2,
  Owner = 3
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variable
  private authState = new BehaviorSubject<AuthState>(AuthState.Visiteur);

  // Observable de l'état de l'authentification
  get authState$() {
    return this.authState.asObservable();
  }

  constructor() { }

  // Fonction pour mettre à jour l'état de l'authentification
  setAuthState(newState: AuthState) {
    this.authState.next(newState);
  }

  // Fonction pour se déconnecter
  deconnexion() {
    this.setAuthState(AuthState.Visiteur);
    this.authState.next(AuthState.Visiteur);
  }

  // Fonction pour récupérer l'état de l'authentification
  getAuthStateObservable() {
    return this.authState.asObservable();
  }

  // Fonction pour se connecter
  login(role: string) {
    if (role === 'ADMIN' || role === 'OWNER') {
      this.setAuthState(AuthState.Admin);
    } else if (role === 'USER') {
      this.setAuthState(AuthState.User);
    } else {
      this.setAuthState(AuthState.Visiteur);
    }
  }

  // Fonction pour s'inscrire et se connecter
  signupAndLogin(user: UserDTO) {
    this.setAuthState(AuthState.User);
  }
}

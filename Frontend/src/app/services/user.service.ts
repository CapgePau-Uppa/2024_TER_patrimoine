import { Injectable } from '@angular/core';
import { UserDTO } from '../components/connexion/user-dto.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // Variable
    user!: UserDTO; 

    constructor() { }

    // Fonction pour mettre à jour l'utilisateur
    setUser(user: UserDTO) {
        this.user = user;
    }

    // Fonction pour récupérer l'utilisateur
    getUser(): UserDTO {
        return this.user!;
    }
}
import { Injectable } from '@angular/core';
import { UserDTO } from '../components/connexion/user-dto.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // Classe pour stocke l'utilisateur connecté
    
        user!: UserDTO; 
    
    constructor() { }
    
    setUser(user: UserDTO) {
        this.user = user;
    }
    
    getUser(): UserDTO {
        return this.user!;
    }

}
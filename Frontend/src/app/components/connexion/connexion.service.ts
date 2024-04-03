import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from './user-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private baseUrl = environment.API;

  constructor(private http: HttpClient) { }

  connexion(email: string, mdp: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth/connexion`, { email, mdp });
  }

  inscription(nom: string, prenom: string, email: string,mdp: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/auth/inscription`, {nom,prenom,email,mdp});
  }

  getRoleByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/auth/role?email=${email}`);
  }


}

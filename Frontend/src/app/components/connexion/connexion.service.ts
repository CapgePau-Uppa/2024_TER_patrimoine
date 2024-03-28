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

  login(user: UserDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, user);
  }


}

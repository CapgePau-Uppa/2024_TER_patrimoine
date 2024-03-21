import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  private baseUrl = environment.API;

  constructor(private http: HttpClient) { }


  getConnexion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/login`);
  }


}

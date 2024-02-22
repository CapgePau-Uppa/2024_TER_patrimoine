import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BatimentDTO } from './batiment-dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  private baseUrl = environment.API;

  constructor(private http: HttpClient) { }

  getBatiments(): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment`);
  }
}

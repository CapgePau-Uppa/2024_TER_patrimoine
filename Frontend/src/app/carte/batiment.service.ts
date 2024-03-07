import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< Updated upstream:Frontend/src/app/carte/batiment.service.ts
import { Observable } from 'rxjs';
=======
import { BehaviorSubject, Observable } from 'rxjs';
>>>>>>> Stashed changes:frontend-angular/src/app/carte/batiment.service.ts
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
<<<<<<< Updated upstream:Frontend/src/app/carte/batiment.service.ts
=======
  getBatimentsByType(type: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-type?type=${type}`);
  }
  
  getBatimentsByDepartement(dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-departement?departement=${dep}`);
  }
  
  
  private selectedTypeSource = new BehaviorSubject<string | null>(null); // Modifiez le type ici
  selectedType$ = this.selectedTypeSource.asObservable();

  setSelectedType(type: string | null): void { // Modifiez le type ici
    this.selectedTypeSource.next(type);
  }

  private selectedDepSource = new BehaviorSubject<string | null>(null); // Modifiez le type ici
  selectedDepartement$ = this.selectedDepSource.asObservable();

  setSelectedDepartement(dep: string | null): void { // Modifiez le type ici
    this.selectedDepSource.next(dep);
}
>>>>>>> Stashed changes:frontend-angular/src/app/carte/batiment.service.ts
}

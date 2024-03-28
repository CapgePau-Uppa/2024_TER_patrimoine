import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  getClusteringDepartement(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/batiment/clustering`);
  }

  getBatimentsClusteringByDepartement(dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/clustering-batiments/${dep}`);
  }

  getBatimentsByType(type: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-type?type=${type}`);
  }

  getBatimentsByDepartement(dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-departement?departement=${dep}`);
  }


  private selectedTypeSource = new BehaviorSubject<string | null>(null);
  selectedType$ = this.selectedTypeSource.asObservable();

  setSelectedType(type: string | null): void { 
    this.selectedTypeSource.next(type);
  }

  private selectedDepSource = new BehaviorSubject<string | null>(null); 
  selectedDepartement$ = this.selectedDepSource.asObservable();

  setSelectedDepartement(dep: string | null): void {
    this.selectedDepSource.next(dep);
}
}

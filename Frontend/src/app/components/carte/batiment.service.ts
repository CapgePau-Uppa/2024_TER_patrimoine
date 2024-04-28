import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BatimentDTO } from './batiment-dto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatimentService {

  private baseUrl = environment.API;

  constructor(private http: HttpClient) { }

  // Tous les batiments *non-utilisé*
  getBatiments(): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment`);
  }

  // Rassemblement des batiments par département pour l'affichage sur la carte
  getClusteringDepartement(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/batiment/clustering`);
  }

  getBatimentsClusteringByDepartement(dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/clustering-batiments/${dep}`);
  }

  // Filtre : par type, par département, par région

  getBatimentsByType(type: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-type?type=${type}`);
  }

  getBatimentsByDepartement(dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-departement?departement=${dep}`);
  }

  getBatimentsByRegion(region: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-region?region=${region}`);
  }

  getBatimentsByTypeAndRegion(type: string, region: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-type-region?type=${type}&region=${region}`);
  }

  getBatimentsByTypeAndDepartement(type: string, dep: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/batiments-par-type-departement?type=${type}&departement=${dep}`);
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

  private selectedRegionSource = new BehaviorSubject<string | null>(null);
  selectedRegion$ = this.selectedRegionSource.asObservable();

  setSelectedRegion(region: string | null): void {
    this.selectedRegionSource.next(region);
  }

  // Filtre rechercher par nom

  getBatimentByName(nom: string): Observable<BatimentDTO[]> {
    return this.http.get<BatimentDTO[]>(`${this.baseUrl}/batiment/rechercher?nom=${nom}`);
  }

  private selectedNomSource = new BehaviorSubject<string | null>(null);
  selectedNom$ = this.selectedNomSource.asObservable();

  setSelectedNom(nom: string | null): void {
    this.selectedNomSource.next(nom);
  }

  // Recherche true ou false 
  private afficherAucunResultat = new BehaviorSubject<boolean>(false);
  afficherAucunResultat$ = this.afficherAucunResultat.asObservable();

  setAfficherAucunResultat(value: boolean) {
    this.afficherAucunResultat.next(value);
  }

  //Recharger la page (lorsqu'on a plus besoins des filtres) *Inutile pour le moment*
  private reloadMapSubject = new Subject<void>();
  reloadMap$ = this.reloadMapSubject.asObservable();

  triggerMapReload() {
    this.reloadMapSubject.next();
  }

  // Message pour appliquer le filtre
  
  private triggerLoadSubject: Subject<void> = new Subject<void>();
  triggerLoad$ = this.triggerLoadSubject.asObservable();
  triggerLoad(): void {
    this.triggerLoadSubject.next();
  }
}

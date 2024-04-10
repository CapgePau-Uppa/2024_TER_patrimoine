import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuggestionDTO } from './suggestion-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AddBatService {

    private baseUrl = environment.API;
    
   
    constructor(private http: HttpClient) { }


    //Liste types
    getAllTypes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/batiment/list-types`);
    }

    // Liste statut
    getAllStatuts(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/batiment/list-statut`);
    }

    getAllRegions(): Observable<string[]> {
      return this.http.get<string[]>(`${this.baseUrl}/batiment/list-region`);
    }

    getAllDepartements(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/batiment/list-departement`);
    }

    getAllCommunes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/batiment/list-commune`);
    }


    //Ajouter batiment

    saveSuggestion(suggestion: SuggestionDTO): Observable<SuggestionDTO> {
        return this.http.post<SuggestionDTO>(`${this.baseUrl}/suggestion/save-suggestion`, suggestion);
      }


}
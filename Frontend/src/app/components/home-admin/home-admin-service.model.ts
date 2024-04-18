import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SuggestionDTO } from '../add-bat/suggestion-dto.model';
@Injectable({
    providedIn: 'root'
})
export class HomeAdminService {
    
    private baseUrl = environment.API;
    
   
    constructor(private http: HttpClient) { }

    /*Suggestions EN ATTENTE */

    //Toutes les suggestions
    getAllSuggestions(): Observable<SuggestionDTO[]> {
        return this.http.get<SuggestionDTO[]>(`${this.baseUrl}/suggestion/all-suggestions`);
    }

    // Toutes les Suggestions EN ATTENTE

    getAllSuggestionsEnAttente(): Observable<SuggestionDTO[]> {
        return this.http.get<SuggestionDTO[]>(`${this.baseUrl}/suggestion/attente-suggestions`);
    }

    // Informations batiment
    getSuggestionById(id: number): Observable<SuggestionDTO> {
        return this.http.get<SuggestionDTO>(`${this.baseUrl}/suggestion/suggestion-by-id/${id}`);
    }

    //Supprimer batiment:
    deleteSuggestion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/suggestion/delete-suggestion?id=${id}`);
    }

    // Valider batiment
    saveSuggestion(suggestion: any) {
        return this.http.post<any>(`${this.baseUrl}/suggestion/save-suggestion-as-batiment`, suggestion);
    }

    /*Historique (suggestion VALIDEE) */

    //Toutes les suggestions VALIDEE
    getAllSuggestionsValidees(): Observable<SuggestionDTO[]> {
        return this.http.get<SuggestionDTO[]>(`${this.baseUrl}/suggestion/historique/all-suggestions`);
    }

    // Mettre une suggestion en validation

    updateSuggestion(id: number, emailAdmin: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/suggestion/historique/validation-suggestion?id=${id}&emailAdmin=${emailAdmin}`, {});
    }

    // Restaurer une suggestion

    restoreSuggestion(id: number): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/suggestion/historique/restauration-suggestion?id=${id}`, {});
    }

   
}
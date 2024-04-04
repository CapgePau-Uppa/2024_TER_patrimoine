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


    //All batiments
    getAllSuggestions(): Observable<SuggestionDTO[]> {
        return this.http.get<SuggestionDTO[]>(`${this.baseUrl}/suggestion/all-suggestions`);
      }

    // Information batiment
    getSuggestionById(id: number): Observable<SuggestionDTO> {
        return this.http.get<SuggestionDTO>(`${this.baseUrl}/suggestion/suggestion-by-id/${id}`);
    }

}
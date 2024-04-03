import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
    private baseUrl = environment.API;
    private validateClickedSubject = new BehaviorSubject<void>(undefined);

    constructor(private http: HttpClient) { }
    validateClicked$ = this.validateClickedSubject.asObservable();


    getAllTypes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/batiment/list-types`);
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

    triggerValidateClicked(): void {
        this.validateClickedSubject.next();
  }

    // Cacher le menu des filtres lorsqu'on a clique sur un élément
    hideFilters() {
        const filtersWindow = document.getElementById("filters-window");
        if (filtersWindow) {
            filtersWindow.style.display = "none";
        };
    }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddBatService } from './add-bat-service.model';
import { SuggestionDTO } from './suggestion-dto.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bat',
  templateUrl: './add-bat.component.html',
  styleUrls: ['./add-bat.component.css']
})
export class AddBatComponent implements OnInit{
  myForm!: FormGroup;
  types!: string[];
  statuts!: string[];

  constructor(private formBuilder: FormBuilder, private addBatService: AddBatService,
    private router: Router) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nomBatiment: ['', Validators.required],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      adresse: [''],
      nomUser: ['', Validators.required],
      emailUser: ['', [Validators.required, Validators.email]]
    });

    this.addBatService.getAllTypes().subscribe(types => this.types = types);
    this.addBatService.getAllStatuts().subscribe(statuts => this.statuts = statuts);
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const suggestion: SuggestionDTO = this.myForm.value;
      this.addBatService.saveSuggestion(suggestion).subscribe(
        (data) => {
          console.log('Suggestion enregistrée avec succès : ', data);
          //this.router.navigate(['../']); a modifier
        },
        (error) => {
          console.error('Erreur lors de l\'enregistrement de la suggestion : ', error);
        }
      );
    } else {
      console.error('Le formulaire est invalide');
      
    }
  }
  

  getErrorMessage(field: string): string | undefined {
    if (this.myForm?.get(field)?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (this.myForm?.get(field)?.hasError('email')) {
      return 'Adresse e-mail invalide';
    }
    return;

  }

}

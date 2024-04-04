import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddBatService } from './add-bat-service.model';
import { SuggestionDTO } from './suggestion-dto.model';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDTO } from '../connexion/user-dto.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-add-bat',
  templateUrl: './add-bat.component.html',
  styleUrls: ['./add-bat.component.css']
})
export class AddBatComponent implements OnInit{
  myForm!: FormGroup;
  types!: string[];
  statuts!: string[];
  utilisateurConnecte!: UserDTO;

  constructor(private formBuilder: FormBuilder, private addBatService: AddBatService,
    private router: Router, private userService: UserService, private globalService: GlobalService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nomBatiment: ['', Validators.required],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      adresse: [''],
      nomUser: ['', Validators.required],
      prenomUser: ['', Validators.required],
    });

    this.addBatService.getAllTypes().subscribe(types => this.types = types);
    this.addBatService.getAllStatuts().subscribe(statuts => this.statuts = statuts);

    //Recuperation de l'utilisateur connecté
    this.utilisateurConnecte = this.userService.getUser();
    const { nom, prenom, email } = this.utilisateurConnecte;
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Email:', email);
  }
  

  onSubmit(): void {
    if (this.myForm.valid) {
      const suggestion: SuggestionDTO = this.myForm.value;
      this.addBatService.saveSuggestion(suggestion).subscribe(
        (data) => {
          console.log('Suggestion enregistrée avec succès : ', data);
          alert('Suggestion enregistrée avec succès !');
          this.globalService.globalVariable = 1;
          this.globalService.isConnected = true;
          this.router.navigate(['../']);
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

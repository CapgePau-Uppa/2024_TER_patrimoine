import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SuggestDataService } from "../../services/suggest-data.service";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
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
export class AddBatComponent implements OnInit {
  myForm!: FormGroup;
  types!: string[];
  statuts!: string[];
  regions!: string[];
  departements!: string[];
  communes!: string[];
  utilisateurConnecte!: UserDTO;

  @ViewChild('lat') latInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('lon') lonInputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('adresse') adresseInputElement!: ElementRef<HTMLInputElement>;


  constructor(private formBuilder: FormBuilder, private addBatService: AddBatService,
    private router: Router, private userService: UserService, private globalService: GlobalService) { }

    //Formulaire
  ngOnInit(): void {
    //Recuperation de informations de l'utilisateur connecté
    this.utilisateurConnecte = this.userService.getUser();
    const { nom, prenom, email } = this.utilisateurConnecte;
    console.log('Nom:', nom);
    console.log('Prénom:', prenom);
    console.log('Email:', email);
    //Initialisation du formulaire
    this.myForm = this.formBuilder.group({
      nomBatiment: ['', Validators.required],
      type: ['', Validators.required],
      statut: ['', Validators.required],
      region: ['', Validators.required],
      departement: ['', Validators.required],
      commune: [''],
      adresse: [''],
      lat: [''],
      lon: [''],
      description: [''],
      nomUser: [nom, Validators.required],      
      prenomUser: [prenom, Validators.required], 
      emailUser: [email, Validators.required],
      checkboxStatus: [Validators.required],
    });


    //Récupération des données pour les listes déroulantes
    this.addBatService.getAllTypes().subscribe(types => this.types = types.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })).slice(5));
    this.addBatService.getAllStatuts().subscribe(statuts => this.statuts = statuts.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllRegions().subscribe(regions => this.regions = regions.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllDepartements().subscribe(departements => this.departements = departements.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    this.addBatService.getAllCommunes().subscribe(communes => this.communes = communes.sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base' })));
    
 
    console.log("Avant l'appel à getCoordinates()");
    this.getCoordinates();

  }


  

  majuscule(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
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

  getCoordinates(): void {
    const inputElement = this.latInputElement.nativeElement;
    const inputElement2 = this.lonInputElement.nativeElement;
    const inputElement3 = this.adresseInputElement.nativeElement;
    const checkboxStatus = this.myForm.get('checkboxStatus')?.value ?? false;
    
    if (checkboxStatus ==='coord') {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              inputElement.value = `${latitude}`;
              inputElement2.value = `${longitude}`;
              inputElement3.disabled = true;
              inputElement.disabled = false;
              inputElement2.disabled = false;
              this.myForm.patchValue({
                lat: latitude,
                lon: longitude,
                adresse: ''
            });
              
          }, (error) => {
              console.error('Erreur de géolocalisation :', error);
          });
      } else {
          console.error("La géolocalisation n'est pas supportée par votre navigateur.");
      }
    } else if (checkboxStatus === 'adresse'){
      const adresseValue = this.myForm.get('adresse')?.value;
      this.myForm.patchValue({
        lat: '',
        lon: '',
        adresse: adresseValue
    });
      inputElement3.disabled = false;
      inputElement.disabled = true;
      inputElement2.disabled = true;  
      
    }
    else{
    }
    
  }
  

  /*New modif */
  // Etape
  etapeCourante: number = 0;
  etapesTitre: string[] = ['Informations', 'Lieu', 'Image(s)', 'Validation'];


  afficherEtape(etapeIndex: number) {
    this.etapeCourante = etapeIndex;
    
  }

  etapeSuivante() {
    if (this.etapeCourante < 3) {
      this.etapeCourante++;
    }
  }

  etapePrecedente() {
    if (this.etapeCourante > 0) {
      this.etapeCourante--;
    }
  }
}

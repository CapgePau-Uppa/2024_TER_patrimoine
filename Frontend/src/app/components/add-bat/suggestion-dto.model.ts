// suggestion-dto.model.ts
export interface SuggestionDTO {
    id: number;
    nomBatiment: string;
    type: string;
    statut: string;
    adresse: string;
    nomUser: string;
    region: string;
    commune: string;
    departement: string;
    lat: number;
    lon: number;
    prenomUser: string;
    emailUser: string;
    description: string;
    image: string;
    etat: string;
    emailAdmin: string;
    dateCreation: Date;
    message: string;
    batimentId: number;
  
  }
  
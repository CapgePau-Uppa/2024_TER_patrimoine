export class BatimentDTO {
    id: number;
    nom: string;
    type: string;
    statut: string;
    image: string;
    lat: number;
    lon: number;
    description: string;
    etoile: number;
  
    constructor(id: number, nom: string,type: string, statut: string, image: string, description:string ,lat: number, lon: number, etoile: number) {
      this.id = id;
      this.nom = nom;
      this.statut= statut;
      this.type= type;
      this.image= image;
      this.description= description;
      this.lat = lat;
      this.lon = lon;
      this.etoile = etoile;
    }
  }
  
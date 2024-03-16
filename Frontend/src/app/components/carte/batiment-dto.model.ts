export class BatimentDTO {
    id: number;
    nom: string;
    type: string;
    statut: string;
    image: string;
    lat: number;
    lon: number;
  
    constructor(id: number, nom: string,type: string, statut: string, image: string, lat: number, lon: number) {
      this.id = id;
      this.nom = nom;
      this.statut= statut;
      this.type= type;
      this.image= image;
      this.lat = lat;
      this.lon = lon;
    }
  }
  
package TER.Backend.api.dto;

import TER.Backend.entities.Batiment;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class BatimentDTO {
    private Long id;
    private String nom;
    private String type;
    private String statut;
    private String image;
    private String description;
    private String commune;
    private String departement;
    private String region;
    private Double lat;
    private Double lon;

    public BatimentDTO(Batiment batiment){
        id= batiment.getId();
        nom= batiment.getNom();
        type = batiment.getType();
        statut = batiment.getStatut();
        image = batiment.getImage();
        description = batiment.getDescription();
        commune = batiment.getLieu().getCommune();
        departement = batiment.getLieu().getDepartement();
        lat= batiment.getCoordonnees().getLat();
        lon = batiment.getCoordonnees().getLon();
        region = batiment.getLieu().getRegion();
    }
    
}

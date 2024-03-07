<<<<<<< Updated upstream
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
    private Double lat;
    private Double lon;

    public BatimentDTO(Batiment batiment){
        id= batiment.getId();
        nom= batiment.getNom();
        type = batiment.getType();
        statut = batiment.getStatut();
        image = batiment.getImage();
        lat= batiment.getCoordonnees().getLat();
        lon = batiment.getCoordonnees().getLon();
    }
    
}
=======
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
    private String commune;
    private String departement;
    private Double lat;
    private Double lon;

    public BatimentDTO(Batiment batiment){
        id= batiment.getId();
        nom= batiment.getNom();
        type = batiment.getType();
        statut = batiment.getStatut();
        image = batiment.getImage();
        commune = batiment.getLieu().getCommune();
        departement = batiment.getLieu().getDepartement();
        lat= batiment.getCoordonnees().getLat();
        lon = batiment.getCoordonnees().getLon();
    }
    
}
>>>>>>> Stashed changes

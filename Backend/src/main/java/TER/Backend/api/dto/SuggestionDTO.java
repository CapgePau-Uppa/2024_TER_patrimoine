package TER.Backend.api.dto;

import java.time.LocalDateTime;
import TER.Backend.entities.Suggestion;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class SuggestionDTO {

    private Long id;
    private String nomBatiment;
    private String type;
    private String statut;
    private String description;
    private String image;
    private LocalDateTime dateCreation;

    private String adresse;
    private String region;
    private String commune;
    private String departement;
    private Double lat;
    private Double lon;

    private String nomUser;
    private String prenomUser;
    private String emailUser;

    /* Attribut lors de la vérification des coordonnées */
    private String message;
    private Long batimentId;

    public SuggestionDTO(Suggestion suggestion){
        id = suggestion.getId();
        nomBatiment = suggestion.getNomBatiment();
        type = suggestion.getType();
        statut = suggestion.getStatut();
        description = suggestion.getDescription();
        image = suggestion.getImage();
        dateCreation = suggestion.getDateCreation();
        adresse = suggestion.getAdresse();
        region = suggestion.getRegion();
        commune = suggestion.getCommune();
        departement = suggestion.getDepartement();
        lat = suggestion.getLat();
        lon = suggestion.getLon();
        nomUser = suggestion.getNomUser();
        prenomUser = suggestion.getPrenomUser();
        emailUser = suggestion.getEmailUser();
    }


    
}

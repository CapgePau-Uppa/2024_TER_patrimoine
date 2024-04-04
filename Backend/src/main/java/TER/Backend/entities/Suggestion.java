package TER.Backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@Table(name = "suggestions")
@AllArgsConstructor
@Getter
@NoArgsConstructor
@Setter
public class Suggestion {

    //Attribut batiment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = true)
    private String nomBatiment;
    @Column(nullable = true)
    private String type;
    @Column(nullable = true)
    private String statut; // Faire un menu déroulant de la liste des statuts
    @Column(nullable = true, length = 8000)
    private String description;
    @Column(nullable = true)
    private String image;
    @Column(nullable = true)
    private LocalDateTime dateCreation;

    //lieu (menu déroulant pour les régions, départements et communes)
    @Column(nullable = true)
    private String region;
    @Column(nullable = true)
    private String commune;    
    @Column(nullable = true)
    private String departement;

    //coordonnées ou adresse
    @Column(nullable = true)
    private String adresse; 
    @Column(nullable = true)
    private Double lat;
    @Column(nullable = true)
    private Double lon;

    //Donnees utilisateur
    @Column(nullable = true)
    private String nomUser;
    @Column(nullable = true)
    private String prenomUser;
    @Column(nullable = true)
    private String emailUser;

    public Suggestion(LocalDateTime dateCreation) {
        this.dateCreation = LocalDateTime.now();
    }

    
}

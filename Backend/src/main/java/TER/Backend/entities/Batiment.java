package TER.Backend.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "batiment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Batiment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //Remplissage automatiques par l'API ou manuel(dans le service) lors de la transfromation d'une suggestion en un batiment
    @Column(nullable = true)
    private String reference;
    @Column(nullable = false, length = 2000)
    private String nom;
    @Column(nullable = true)
    private String type;
    @Column(nullable = true)
    private String statut;
    @Column(nullable = true, length = 8000)
    private String description;
    //Image donne par défaut dans util/ImagesUtil.java
    @Column(nullable = true, length = 5000)
    private String image;
    //Système d'évaluations des utilisateurs d'un batiment
    @Column(nullable = true)
    private int etoile;

    @OneToOne
    @JoinColumn(name = "lieu_id", referencedColumnName = "id")
    private Lieu lieu;

    @OneToOne
    @JoinColumn(name = "coordonnees_id", referencedColumnName = "id")
    private Coordonnees coordonnees;

    @OneToOne
    @JoinColumn(name = "suggestion_id", referencedColumnName = "id")
    private Suggestion suggestion;


}

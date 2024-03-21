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
    //Remplissage automatiques par l'API ou manuel lors de la création d'un nouveau batiment
    @Column(nullable = false)
    private String reference;
    @Column(nullable = false, length = 2000)
    private String nom;
    @Column(nullable = true)
    private String type;
    @Column(nullable = true)
    private String statut;
    @Column(nullable = true, length = 8000)
    private String description;
    //Image donne par défaut
    @Column(nullable = true, length = 5000)
    private String image;
    //Système d'évaluations des utilisateurs d'un batiment
    @Column(nullable = true)
    private int etoile;
    //pour les commentaires creer une classe commentaire et la mappé ici

    @OneToOne
    @JoinColumn(name = "lieu_id", referencedColumnName = "id")
    private Lieu lieu;

    @OneToOne
    @JoinColumn(name = "coordonnees_id", referencedColumnName = "id")
    private Coordonnees coordonnees;


}

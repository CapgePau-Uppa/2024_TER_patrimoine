package TER.Backend.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonProperty;
import TER.Backend.entities.Coordonnees;

/*
 * Model pour les données de la base Merimee, utilisé pour la transformation des données de l'API en données utilisables par le service
 * Les noms des attributs doivent être identique à ceux de l'API
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MerimeeData {
    //Attribut pour Batiment
    //Nom
    @JsonProperty("titre_editorial_de_la_notice")
    private String titre_editorial_de_la_notice;
    //reference
    @JsonProperty("reference")
    private String reference;
    //Type
    @JsonProperty("denomination_de_l_edifice")
    private String denomination_de_l_edifice;

    //Statut
    @JsonProperty("statut_juridique_de_l_edifice")
    private String statut_juridique_de_l_edifice;
    //Description
    @JsonProperty("historique")
    private String historique;
    /*Image *non-utilsé*
    * @JsonProperty("lien_vers_la_base_archiv_mh")
    * private String lien_vers_la_base_archiv_mh;
    */

    //Attribut pour le lieu : region,commune,departement
    @JsonProperty("region")
    private List<String> region;
    @JsonProperty("commune_forme_index")
    private String commune_forme_index;
    @JsonProperty("departement_en_lettres")
    private List<String> departement_en_lettres;
    

    //Coordonnées
    @JsonProperty("coordonnees_au_format_wgs84")
    private Coordonnees coordonnees_au_format_wgs84;
    @JsonProperty("lat")
    private Double lat;
    @JsonProperty("lon")
    private Double lon;
    
    
    @Override
    public String toString() {
        return "MerimeeData [titre_editorial_de_la_notice=" + titre_editorial_de_la_notice + ", reference=" + reference
                + ", denomination_de_l_edifice=" + denomination_de_l_edifice + ", statut_juridique_de_l_edifice="
                + statut_juridique_de_l_edifice + ", historique=" + historique + ", region=" + region + ", commune_forme_index=" + commune_forme_index
                + ", departement_en_lettres=" + departement_en_lettres + ", coordonnees_au_format_wgs84="
                + coordonnees_au_format_wgs84 + ", lat=" + lat + ", lon=" + lon + "]";
    }
    


   
    
    

    
}

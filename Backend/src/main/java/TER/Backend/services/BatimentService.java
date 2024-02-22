package TER.Backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TER.Backend.api.dto.BatimentDTO;
import TER.Backend.entities.Batiment;
import TER.Backend.entities.Coordonnees;
import TER.Backend.entities.Lieu;
import TER.Backend.model.MerimeeData;
import TER.Backend.repository.BatimentRepository;
import TER.Backend.repository.CoordonneesRepository;
import TER.Backend.repository.LieuRepository;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class BatimentService {

    @Autowired
    private BatimentRepository batimentRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private CoordonneesRepository coordonneesRepository;

    public void enregistrerBatiments(List<MerimeeData> listeMerimeeData) {
        //voir si il y a des espaces 
        Pattern pattern = Pattern.compile("\\b\\w+\\s+\\w+\\b");
        for (MerimeeData merimeeData : listeMerimeeData) {
            //Verifier si le titre n'est pas un seul mot 
            Matcher matcher = pattern.matcher(merimeeData.getTitre_editorial_de_la_notice());
            //Verifier si les coordonnées ne sont pas nuls (dans les donnes il y a des coordonnees null)
            Coordonnees coord = merimeeData.getCoordonnees_au_format_wgs84();
            if (matcher.find() && coord != null) {
                //Créer lieu
                Lieu lieu = new Lieu();
                lieu.setRegion(merimeeData.getRegion().get(0));
                lieu.setCommune(merimeeData.getCommune_forme_index());
                lieu.setDepartement(merimeeData.getDepartement_en_lettres().get(0));
                lieuRepository.save(lieu);
                
                //Créer coordonnées
                Coordonnees coordonnees = new Coordonnees();
                coordonnees.setLat(coord.getLat());
                coordonnees.setLon(coord.getLon());
                coordonneesRepository.save(coordonnees);

                //Créer batiment
                Batiment batiment = new Batiment();
                batiment.setReference(merimeeData.getReference());
                batiment.setNom(merimeeData.getTitre_editorial_de_la_notice());
                batiment.setType(merimeeData.getDenomination_de_l_edifice());
                batiment.setStatut(merimeeData.getStatut_juridique_de_l_edifice());
                batiment.setDescription(merimeeData.getHistorique());
                batiment.setImage(merimeeData.getLien_vers_la_base_archiv_mh());
                batiment.setLieu(lieu); 
                batiment.setCoordonnees(coordonnees);

                //Enregistrer batiment
                batimentRepository.save(batiment);
            }
        }
    }

    //recuperation desbatimments et leurs coordonnes
    public List<Batiment> findAllBatiments() {
        return batimentRepository.findAll();
    }
    //recuperation de tous les batiments
    public List<BatimentDTO> getAllBatiments() {
        List<Batiment> batiments = batimentRepository.findAll();
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }

    


}
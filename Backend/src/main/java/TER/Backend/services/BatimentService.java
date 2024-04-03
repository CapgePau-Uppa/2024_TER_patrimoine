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
import TER.Backend.util.ImagesUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        //Pattern pattern = Pattern.compile("\\b\\w+\\s+\\w+\\b");
        for (MerimeeData merimeeData : listeMerimeeData) {
            //Verifier si le titre n'est pas un seul mot 
            //Matcher matcher = pattern.matcher(merimeeData.getTitre_editorial_de_la_notice());
            //Verifier l'existence du batiment
            //Batiment existingBatiment = batimentRepository.findByReference(merimeeData.getReference());
            //Verifier si les coordonnées ne sont pas nuls (car dans les données il y a des coordonnees null)
            Coordonnees coord = merimeeData.getCoordonnees_au_format_wgs84(); //existingBatiment == null && 
            if (coord != null) {
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
                //batiment.setImage(merimeeData.getLien_vers_la_base_archiv_mh());
                String imageName = ImagesUtil.getImageForType(merimeeData.getDenomination_de_l_edifice());
                batiment.setImage(imageName);
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
    //Affichage des batiments par département
    public List<Map<String, Object>> getBuildingClusteringByDepartment() {
        List<Object[]> results = batimentRepository.countAndFirstBuildingCoordinatesByDepartement();
        List<Map<String, Object>> clusteringData = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> data = new HashMap<>();
            data.put("departement", (String) result[0]);
            data.put("count", (Long) result[1]);
            data.put("lat", (Double) result[2]);
            data.put("lon", (Double) result[3]);
            clusteringData.add(data);
        }
        return clusteringData;
    }
    //Trouver un batiment par type
    public List<Batiment> findBatimentsByType(String type) {
        return batimentRepository.findByType(type);
    }
    public List<BatimentDTO> getBatimentsByType(String type) {
        List<Batiment> batiments = batimentRepository.findByTypeContaining(type);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    // Trouver un batiment par nom
    public List<BatimentDTO> getBatimentsByNom(String nom) {
        List<Batiment> batiments = batimentRepository.findByNomContainingIgnoreCase(nom);
        return batiments.stream()
                       .map(batiment -> new BatimentDTO(batiment))
                       .collect(Collectors.toList());
    }
    //recuperation liste types des batiments
    public List<String> findAllTypes() {
        return batimentRepository.findDistinctTypes();
    }
    //recuperation liste regions des batiments
    public List<String> findAllRegions() {
        return batimentRepository.findDistinctRegions();
    }
    
    public List<BatimentDTO> getBatimentsByRegion(String region) {
        List<Batiment> batiments = batimentRepository.findByRegion(region);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    //recuperation liste communes des batiments
    public List<String> findAllCommunes() {
        return batimentRepository.findDistinctCommunes();
    }

    public List<BatimentDTO> getBatimentsByCommune(String commune) {
        List<Batiment> batiments = batimentRepository.findByCommune(commune);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    
    //recuperation liste departements des batiments
    public List<String> findAllDepartements() {
        return batimentRepository.findDistinctDepartements();
    }

    public List<BatimentDTO> getBatimentsByDepartement(String dep) {
        List<Batiment> batiments = batimentRepository.findByDepartement(dep);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    

    


}

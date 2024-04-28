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
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BatimentService {

    @Autowired
    private BatimentRepository batimentRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private CoordonneesRepository coordonneesRepository;

    /*
     * Importation des données de l'api dans la base de données locale
     */
    public void enregistrerBatiments(List<MerimeeData> listeMerimeeData) {
        for (MerimeeData merimeeData : listeMerimeeData) {
            /*
             * Pour chaque batiment dans la liste, on vérifie s'il existe déjà dans la base de données locale à l'aide de la réference qui est unique pour chaque batiment.
             * Elle permet de vérifier si le batiment a déjà été importé ou non lors d'une mise à jour.
             * Pour une première importation, cette vérification n'est pas nécessaire et donc peut être commentée pour gagner en temps.
             */
            Batiment existingBatiment = batimentRepository.findByReference(merimeeData.getReference());
            /*
             * Les coordonnées des batiments de l'API sont parfois nulles, il faut donc vérifier si elles ne le sont pas avant de créer un batiment.
             * Les coordonnées etant une entité importante pour la localisation des batiments, il est nécessaire qu'elles soient renseignées.
             */
            Coordonnees coord = merimeeData.getCoordonnees_au_format_wgs84();
            if (existingBatiment == null && coord != null) {
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

    //Recuperation des batimments et leurs coordonnées
    public List<Batiment> findAllBatiments() {
        return batimentRepository.findAll();
    }
    //Recuperation d'un batiment par son id
    public BatimentDTO findById(Long id) {
        Optional<Batiment> batimentOptional = batimentRepository.findById(id);
        return batimentOptional.map(BatimentDTO::new).orElse(null);
    }
    // Recuperation d'un batiments par ces coordonnées
    public Long findBatimentIdByCoordonnees(Double lat, Double lon) {
        Optional<Long> batimentIdOptional = batimentRepository.findBatimentIdByCoordonnees(lat, lon);
        return batimentIdOptional.orElse(null);
    }
    //Recuperation de tous les batiments
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
    //Trouver un batiment par nom
    public List<BatimentDTO> getBatimentsByNom(String nom) {
        List<Batiment> batiments = batimentRepository.findByNomContainingIgnoreCase(nom);
        return batiments.stream()
                       .map(batiment -> new BatimentDTO(batiment))
                       .collect(Collectors.toList());
    }
    //Recuperation liste types des batiments
    public List<String> findAllTypes() {
        return batimentRepository.findDistinctTypes();
    }
    //Recuperation liste regions des batiments
    public List<String> findAllRegions() {
        return batimentRepository.findDistinctRegions();
    }
    
    public List<BatimentDTO> getBatimentsByRegion(String region) {
        List<Batiment> batiments = batimentRepository.findByRegion(region);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    //Recuperation liste communes des batiments
    public List<String> findAllCommunes() {
        return batimentRepository.findDistinctCommunes();
    }
    public List<String> getCommunesByDepartement(String departement) {
        return lieuRepository.findDistinctCommunesByDepartement(departement);
    }

    public List<BatimentDTO> getBatimentsByCommune(String commune) {
        List<Batiment> batiments = batimentRepository.findByCommune(commune);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    
    //Recuperation liste departements des batiments
    public List<String> findAllDepartements() {
        return batimentRepository.findDistinctDepartements();
    }
    public List<String> getDepartementsByRegion(String region) {
        return lieuRepository.findDistinctDepartementsByRegion(region);
    }

    public List<BatimentDTO> getBatimentsByDepartement(String dep) {
        List<Batiment> batiments = batimentRepository.findByDepartement(dep);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }

    //Recuperation liste statuts des batiments
    public List<String> findAllStatuts() {
        return batimentRepository.findDistinctStatut();
    }
    
    //Filtre combiné
    public List<BatimentDTO> getBatimentsByTypeAndRegion(String type, String region) {
        List<Batiment> batiments = batimentRepository.findByTypeAndRegion(type, region);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    public List<BatimentDTO> getBatimentsByTypeAndDepartement(String type, String departement) {
        List<Batiment> batiments = batimentRepository.findByTypeAndDepartement(type, departement);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    public List<BatimentDTO> getBatimentsByTypeAndCommune(String type, String commune) {
        List<Batiment> batiments = batimentRepository.findByTypeAndCommune(type, commune);
        return batiments.stream()
                        .map(batiment -> new BatimentDTO(batiment))
                        .collect(Collectors.toList());
    }
    

    


}

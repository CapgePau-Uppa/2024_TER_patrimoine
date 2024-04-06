package TER.Backend.api.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.BatimentDTO;
import TER.Backend.services.BatimentService;

@RestController
@RequestMapping("/api/batiment")
@CrossOrigin(origins = {"http://http://localhost:4200/"})
public class BatimentAPI {

    @Autowired
    private BatimentService batimentService;

    public BatimentAPI(BatimentService batimentService) {
        this.batimentService = batimentService;
    }

    //Get tout les batiments pour ensuite les afficher sur la carte (solution avec données<=100)
    @GetMapping
    public List<BatimentDTO> getAllBatiments() {
        return batimentService.getAllBatiments();
    }
    //Get tous les batiments par departement pour ensuite les afficher sur la carte (solution pour toutes les données)
    @GetMapping("/clustering")
    public ResponseEntity<List<Map<String, Object>>> getBuildingClusteringByDepartment() {
        List<Map<String, Object>> clusteringData = batimentService.getBuildingClusteringByDepartment();
        return ResponseEntity.ok(clusteringData);
    }
     @GetMapping("/clustering-batiments/{dep}")
    public ResponseEntity<List<BatimentDTO>> getBatimentsOfDepartement(@PathVariable String dep) {
        List<BatimentDTO> batiments = batimentService.getBatimentsByDepartement(dep);
        if (batiments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(batiments, HttpStatus.OK);
    }
    
    /*--------Filtres--------*/
    //Types (tous les types meme ceux qui ont 2 types ou plus)
    @GetMapping("/list-types-all")
    public List<String> getAllTypesDouble() {
        return batimentService.findAllTypes();
        
    }
    //Types sans les doubles types
    @GetMapping("/list-types")
    public List<String> getAllTypes() {
        List<String> allTypes = batimentService.findAllTypes();
        Set<String> uniqueTypes = new HashSet<>();
        for (String type : allTypes) {
            if (type != null) {
                String[] splitTypes = type.split("[;,]+"); // Enlever les ';' ','
                uniqueTypes.addAll(Arrays.asList(splitTypes));
            }
        }
        List<String> sortedUniqueTypes = new ArrayList<>(uniqueTypes);
        Collections.sort(sortedUniqueTypes); // Tri par ordre alphabétique
        return sortedUniqueTypes;
    }

    @GetMapping("/batiments-par-type")
    public List<BatimentDTO> getBatimentsByType(@RequestParam("type") String type) {
        return batimentService.getBatimentsByType(type);
    }

    //Rechercher

    @GetMapping("/rechercher")
    public ResponseEntity<List<BatimentDTO>> getBatimentsByNom(@RequestParam("nom") String nom) {
        List<BatimentDTO> batiments = batimentService.getBatimentsByNom(nom);
        return new ResponseEntity<>(batiments, HttpStatus.OK);
    }

    //Commune
    @GetMapping("/list-commune")
    public List<String> getAllCommunes() {
        return batimentService.findAllCommunes();
        
    }

    @GetMapping("/batiments-par-commune")
    public List<BatimentDTO> getBatimentsByCommune(@RequestParam("commune") String commune) {
        return batimentService.getBatimentsByCommune(commune);
    }

    //Region
    @GetMapping("/list-region")
    public List<String> getAllRegions() {
        return batimentService.findAllRegions();
        
    }
    @GetMapping("/batiments-par-region")
    public List<BatimentDTO> getBatimentsByRegion(@RequestParam("region") String region) {
        return batimentService.getBatimentsByRegion(region);
    }
    //Departement
    @GetMapping("/list-departement")
    public List<String> getAllDepartements() {
        return batimentService.findAllDepartements();
        
    }

    @GetMapping("/batiments-par-departement")
    public List<BatimentDTO> getBatimentsByDepartement(@RequestParam("departement") String dep) {
        return batimentService.getBatimentsByDepartement(dep);
    }
    
    //Statut
    @GetMapping("/list-statut")
    public List<String> getAllStatuts() {
        return batimentService.findAllStatuts();
        
    }
    
    //Filtre combiné
    @GetMapping("/batiments-par-type-region")
    public List<BatimentDTO> getBatimentsByTypeAndRegion(@RequestParam("type") String type, @RequestParam("region") String region) {
        return batimentService.getBatimentsByTypeAndRegion(type, region);
    }
    @GetMapping("/batiments-par-type-departement")
    public List<BatimentDTO> getBatimentsByTypeAndDepartement(@RequestParam("type") String type, @RequestParam("departement") String departement) {
        return batimentService.getBatimentsByTypeAndDepartement(type, departement);
    }
    @GetMapping("/batiments-par-type-commune")
    public List<BatimentDTO> getBatimentsByTypeAndCommune(@RequestParam("type") String type, @RequestParam("commune") String commune) {
        return batimentService.getBatimentsByTypeAndCommune(type, commune);
    }
    
    
}

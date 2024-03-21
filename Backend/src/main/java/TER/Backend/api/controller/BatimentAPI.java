package TER.Backend.api.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.BatimentDTO;
import TER.Backend.entities.Batiment;
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

    //Get tout les batiments pour ensuite les afficher sur la carte
    @GetMapping
    public List<BatimentDTO> getAllBatiments() {
        return batimentService.getAllBatiments();
    }
    
    /*--------Filtre--------*/
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
                String[] splitTypes = type.split("[;,]+"); // Diviser par ';' ','
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
    //Departement
    @GetMapping("/list-departement")
    public List<String> getAllDepartements() {
        return batimentService.findAllDepartements();
        
    }

    @GetMapping("/batiments-par-departement")
    public List<BatimentDTO> getBatimentsByDepartement(@RequestParam("departement") String dep) {
        return batimentService.getBatimentsByDepartement(dep);
    }
    
    
    
    
}

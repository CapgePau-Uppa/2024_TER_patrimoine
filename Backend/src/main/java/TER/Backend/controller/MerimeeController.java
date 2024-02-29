package TER.Backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import TER.Backend.model.MerimeeData;
import TER.Backend.services.BatimentService;
import TER.Backend.services.MerimeeDataService;
import jakarta.annotation.PostConstruct;

@RestController
public class MerimeeController {

    @Autowired
    private MerimeeDataService merimeeAPIService;

    @Autowired
    private BatimentService batimentService;
    

    // Importer les données au démarrage de l'application
    @PostConstruct
    public void importerDonneesAuDemarrage() {
        List<MerimeeData> listeMerimeeData = merimeeAPIService.recupererDonnees();
        batimentService.enregistrerBatiments(listeMerimeeData);
        System.out.println("Données importées avec succès!");
    }
    

    
}


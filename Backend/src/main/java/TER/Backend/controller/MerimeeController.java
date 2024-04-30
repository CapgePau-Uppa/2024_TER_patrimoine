package TER.Backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import TER.Backend.model.MerimeeData;
import TER.Backend.services.BatimentService;
import TER.Backend.services.MerimeeDataService;
import jakarta.annotation.PostConstruct;

/* 
 * Controller pour l'importation des données de l'api Merimée 
*/
@RestController
public class MerimeeController {

    /* Pour une première importation des données de l'api Merimée, utiliser @PostConstruct au lieu du @Scheduled */
    /* Le @Scheduled permet de faire la mise à jour des données de l'api, la màj ce fera le 5 des mois à minuit (00:00:00)  */

    @Autowired
    private MerimeeDataService merimeeAPIService;

    @Autowired
    private BatimentService batimentService; 
    
    
    //@PostConstruct
    //@Scheduled(cron = "0 0 0 5 * ?")
    /*public void importerDonneesAuDemarrage() {
        List<MerimeeData> listeMerimeeData = merimeeAPIService.recupererDonnees();
        batimentService.enregistrerBatiments(listeMerimeeData);
        System.out.println("Données importées avec succès!");
    }*/
    

    
}


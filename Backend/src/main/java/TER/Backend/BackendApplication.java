package TER.Backend;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import TER.Backend.api.dto.BatimentDTO;
import TER.Backend.entities.Batiment;
import TER.Backend.services.BatimentService;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private BatimentService batimentService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Appelez la méthode getBatimentsByType avec le type spécifié
        String typeRecherche = "Charente";
        List<BatimentDTO> batiments = batimentService.getBatimentsByDepartement(typeRecherche);
            
        // Affichez les résultats dans la console
        if (batiments.isEmpty()) {
            System.out.println("Aucun bâtiment trouvé pour le type: ");
        } else {
            System.out.println("Bâtiments de type " + typeRecherche + ":");
            for (BatimentDTO batiment : batiments) {
                System.out.println(batiment);
            }
        }
    }
}



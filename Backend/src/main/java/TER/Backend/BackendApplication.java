package TER.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BackendApplication{ /*implements CommandLineRunner  */

    //@Autowired
    //private MerimeeDataService merimeeDataService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    /* 
    @Override
    public void run(String... args) throws Exception {
        // Afficher les donnes recuperer dans le terminal
        List<MerimeeData> donnees = merimeeDataService.recupererDonnees();
        for (MerimeeData data : donnees) {
            System.out.println(data);
        }
    }*/
    
	}



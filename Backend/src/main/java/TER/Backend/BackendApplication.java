package TER.Backend;

import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import TER.Backend.security.entity.User;
import TER.Backend.security.service.UserService;
import TER.Backend.services.BatimentService;


@SpringBootApplication
public class BackendApplication{ //implements CommandLineRunner 

    

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
        /* ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
        UserService userService = context.getBean(UserService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);

        Scanner scanner = new Scanner(System.in);

        System.out.println("Que souhaitez-vous faire ?");
        System.out.println("1. Créer un utilisateur");
        System.out.println("2. Créer un administrateur");
        System.out.println("3. Se connecter");
        System.out.print("Votre choix : ");
        int choix = scanner.nextInt();
        scanner.nextLine(); // Consommer le retour chariot

        switch (choix) {
            case 1:
                System.out.println("Création d'un utilisateur");
                createUser(scanner, userService, passwordEncoder);
                break;
            case 2:
                System.out.println("Création d'un administrateur");
                createAdmin(scanner, userService, passwordEncoder);
                break;
            case 3:
                System.out.println("Connexion");
                loginUser(scanner, userService, passwordEncoder);
                break;
            default:
                System.out.println("Choix invalide");
                break;
        }

        scanner.close();
        context.close();
    }

    private static void createUser(Scanner scanner, UserService userService, PasswordEncoder passwordEncoder) {
        System.out.print("Nom : ");
        String nom = scanner.nextLine();
        System.out.print("Prénom : ");
        String prenom = scanner.nextLine();
        System.out.print("Email : ");
        String email = scanner.nextLine();
        System.out.print("Mot de passe : ");
        String mdp = scanner.nextLine();

        userService.saveUser(nom, prenom, email, mdp);
        System.out.println("Utilisateur créé avec succès.");
    }

    private static void createAdmin(Scanner scanner, UserService userService, PasswordEncoder passwordEncoder) {
        System.out.print("Nom : ");
        String nom = scanner.nextLine();
        System.out.print("Prénom : ");
        String prenom = scanner.nextLine();
        System.out.print("Email : ");
        String email = scanner.nextLine();
        System.out.print("Mot de passe : ");
        String mdp = scanner.nextLine();

        userService.saveAdmin(nom, prenom, email, mdp);
        System.out.println("Administrateur créé avec succès.");
    }

    private static void loginUser(Scanner scanner, UserService userService, PasswordEncoder passwordEncoder) {
        System.out.print("Email : ");
        String email = scanner.nextLine();
        System.out.print("Mot de passe : ");
        String mdp = scanner.nextLine();

        User user = userService.findByEmail(email);
        if (user != null && passwordEncoder.matches(mdp, user.getMdp())) {
            System.out.println("Connexion réussie pour l'utilisateur : " + user.getEmail());
        } else {
            System.out.println("Échec de la connexion. Vérifiez vos informations d'identification.");
        }
    }
    

    @Override
    public void run(String... args) throws Exception {
        List<Map<String, Object>> clusteringData = batimentService.getBuildingClusteringByDepartment();
        int cpt=0;
        System.out.println("Départements avec leurs coordonnées et leur nombre de bâtiments :");
        for (Map<String, Object> data : clusteringData) {
            String departement = (String) data.get("departement");
            Long count = (Long) data.get("count");
            Double latitude = (Double) data.get("lat");
            Double longitude = (Double) data.get("lon");
            cpt=cpt+1;

            System.out.println("Département : " + departement);
            System.out.println("Nombre de bâtiments : " + count);
            System.out.println("Latitude : " + latitude);
            System.out.println("Longitude : " + longitude);
            System.out.println("---------------------------------------------");
        }
        System.out.println(cpt);
        
    }*/
}


}
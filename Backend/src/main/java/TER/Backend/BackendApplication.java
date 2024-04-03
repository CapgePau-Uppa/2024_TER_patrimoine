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
        //SpringApplication.run(BackendApplication.class, args);
        ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
        UserService userService = context.getBean(UserService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
        BatimentService batimentService = context.getBean(BatimentService.class);
        boolean ok=true;
        Scanner scanner = new Scanner(System.in);

        while(ok){
        System.out.println("1. Inscription utilisateur");
        System.out.println("2. Créer un administrateur");
        System.out.println("3. Se connecter");
        System.out.println("4. Rechercher un bâtiment");
        System.out.println("5. Nombre de bâtiments par département");
        System.out.println("6. Trouver le role d'un utilisateurs");
        System.out.println("7. Trouver le type/region d'un bâtiment");
        System.out.println("8. Quitter");
        System.out.print("Votre choix : ");
        int choix = scanner.nextInt();
        scanner.nextLine(); // Consommer le retour chariot

        switch (choix) {
            case 1:
                System.out.println("Inscription");
                createUser(scanner, userService, passwordEncoder);
                break;
            case 2:
                System.out.println("Création d'un admnin");
                createAdmin(scanner, userService, passwordEncoder);
                break;
            case 3:
                System.out.println("Connexion");
                loginUser(scanner, userService, passwordEncoder);
                break;
            case 4:
                System.out.println("Recherche d'un bâtiment");
                rechercherBatiment(scanner, batimentService);
                break;
            case 5:
                System.out.println("Nombre de âtiments par département");
                rechercherClusters(batimentService);
                break;
            case 6:
                System.out.println("Role");
                rechercherRole(scanner, userService);
                break;
            case 7:
                System.out.println("1. Type de bâtiment");
                System.out.println("2. Région");
                int choix2 = scanner.nextInt();
                scanner.nextLine();
                switch (choix2) {
                    case 1:
                        rechercherType(scanner, batimentService);
                        break;
                    case 2:
                        rechercherBatimentParRegion(scanner, batimentService);
                        break;
                    default:
                        System.out.println("Choix invalide");
                        break;
                }
            case 8:
                ok=false;
                break;
            default:
                System.out.println("Choix invalide");
                break;
        }
    }
        scanner.close();
        context.close();
    }

    private static void rechercherBatimentParRegion(Scanner scanner, BatimentService batimentService) {
        System.out.print("Nom de la région : ");
        String nomRegion = scanner.nextLine();
        System.out.println("Résultats de la recherche : ");
        batimentService.getBatimentsByRegion(nomRegion).forEach(System.out::println);
    }

    private static void rechercherType(Scanner scanner, BatimentService batimentService) {
        System.out.print("Type du bâtiment : ");
        String typeBatiment = scanner.nextLine();
        System.out.println("Résultats de la recherche : ");
        batimentService.getBatimentsByType(typeBatiment).forEach(System.out::println);
        int count = batimentService.getBatimentsByType(typeBatiment).size();
        System.out.println("Nombre de bâtiments de type " + typeBatiment + " : " + count);
    }

    private static void rechercherRole(Scanner scanner, UserService userService) {
        System.out.print("Email : ");
        String email = scanner.nextLine();
        String role = userService.getRoleByEmail(email);
        System.out.println(role);
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
            System.out.println("Connexion réussie pour " + user.getEmail());
        } else {
            System.out.println("Échec de la connexion");
        }
    }

    private static void rechercherBatiment(Scanner scanner, BatimentService batimentService) {
        System.out.print("Nom du bâtiment : ");
        String nomBatiment = scanner.nextLine();
        System.out.println("Résultats de la recherche : ");
        batimentService.getBatimentsByNom(nomBatiment).forEach(System.out::println);
    }

    private static void rechercherClusters(BatimentService batimentService) {
        System.out.println("Départements avec leurs coordonnées et leur nombre de bâtiments :");
        batimentService.getBuildingClusteringByDepartment().forEach(data -> {
            String departement = (String) data.get("departement");
            Long count = (Long) data.get("count");
            Double latitude = (Double) data.get("lat");
            Double longitude = (Double) data.get("lon");

            System.out.println("Département : " + departement);
            System.out.println("Nombre de bâtiments : " + count);
            System.out.println("Latitude : " + latitude);
            System.out.println("Longitude : " + longitude);
            System.out.println("---------------------------------------------");
        });
    }
}



package TER.Backend;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

import TER.Backend.api.dto.SuggestionDTO;
import TER.Backend.entities.Batiment;
import TER.Backend.entities.Suggestion;
import TER.Backend.repository.LieuRepository;
import TER.Backend.repository.SuggestionRepository;
import TER.Backend.security.entity.User;
import TER.Backend.security.service.UserService;
import TER.Backend.services.BatimentService;
import TER.Backend.services.SuggestionService;


@SpringBootApplication
public class BackendApplication{ //implements CommandLineRunner 

    public static void main(String[] args) {
        System.out.println("BACKEND DEMARRÉ");

        //SpringApplication.run(BackendApplication.class, args);
        ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
        UserService userService = context.getBean(UserService.class);
        PasswordEncoder passwordEncoder = context.getBean(PasswordEncoder.class);
        BatimentService batimentService = context.getBean(BatimentService.class);
        SuggestionService suggestionService = context.getBean(SuggestionService.class);
        SuggestionRepository suggestionsRepository = context.getBean(SuggestionRepository.class);
        LieuRepository lieuRepository = context.getBean(LieuRepository.class);
        boolean ok=true;
        Scanner scanner = new Scanner(System.in);

        while (ok){
            System.out.println("1. Créer une nouvelle suggestion");
            System.out.println("2. Liste commune");
            System.out.println("3. Afficher toutes les suggestions");
            System.out.println("4. Afficher une suggestion par id");
            System.out.println("5. Type et region d'un bâtiment");
            System.out.println("6. Quitter");
            System.out.print("Votre choix : ");
            int choix = scanner.nextInt();
            scanner.nextLine();
            switch (choix) {
                case 1:
                    createSuggestion(scanner, suggestionService);
                    break;
                case 2:
                    deleteSuggestion(batimentService);
                    break;
                case 3:
                    getAllSuggestions(scanner, lieuRepository);
                    break;
                case 4:
                    getSuggestionById(scanner, suggestionService);
                    break;
                case 5:
                    findByTypeRegion(scanner, batimentService);
                    break;
                case 6:
                    ok = false;
                    break;
                default:
                    System.out.println("Choix invalide");
            }
        }
        scanner.close();
    }

    private static void findByTypeRegion(Scanner scanner, BatimentService batimentService) {
        System.out.print("Region ");
        String region = scanner.nextLine();
        System.out.print("Type ");
        String type = scanner.nextLine();
        batimentService.getBatimentsByTypeAndCommune(type, region).forEach(System.out::println);
    }

    private static void getSuggestionById(Scanner scanner, SuggestionService suggestionService) {
        System.out.print("Entrez l'ID de la suggestion à afficher : ");
        Long id = scanner.nextLong();
        scanner.nextLine();
        System.out.println(suggestionService.getSuggestionById(id));
    }

    private static void getAllSuggestions(Scanner scanner, LieuRepository lieuRepository) {
        System.out.println("Veuillez entrer une région : ");
        String region = scanner.nextLine();

        List<String> departements = lieuRepository.findDistinctDepartementsByRegion(region);
        int nbr = departements.size();
        System.out.println("Départements pour la région " + region + " : ");
        for (String departement : departements) {
            System.out.println(departement);
        }
        System.out.println("Nombre de départements : " + nbr);

    }

    private static void deleteSuggestion(BatimentService batimentService) {
        System.out.print("Tous les statut : ");
        batimentService.findAllCommunes().forEach(System.out::println);
    }

    private static void createSuggestion(Scanner scanner, SuggestionService suggestionService) {
        System.out.print("Nom du bâtiment : ");
        String nomBatiment = scanner.nextLine();
        System.out.print("Type du bâtiment : ");
        String type = scanner.nextLine();
        System.out.print("Statut du bâtiment : ");
        String statut = scanner.nextLine();
        System.out.print("Description du bâtiment : ");
        String description = scanner.nextLine();
        System.out.print("Région : ");
        String region = scanner.nextLine();

        System.out.print("Commune : ");
        String commune = scanner.nextLine();

        System.out.print("Département : ");
        String departement = scanner.nextLine();

        System.out.print("Adresse : ");
        String adresse = scanner.nextLine();

        System.out.print("Latitude : ");
        String latString = scanner.nextLine();


        System.out.print("Longitude : ");
        String lonString = scanner.nextLine();
        

        System.out.print("Nom de l'utilisateur : ");
        String nomUser = scanner.nextLine();

        System.out.print("Prénom de l'utilisateur : ");
        String prenomUser = scanner.nextLine();

        System.out.print("Email de l'utilisateur : ");
        String emailUser = scanner.nextLine();

        Suggestion suggestion = new Suggestion();
        suggestion.setNomBatiment(nomBatiment);
        suggestion.setType(type);
        suggestion.setStatut(statut);
        suggestion.setDescription(description);
        //suggestion.setImage(image);
        suggestion.setDateCreation(LocalDateTime.now());
        suggestion.setRegion(region);
        suggestion.setCommune(commune);
        suggestion.setDepartement(departement);
        suggestion.setAdresse(adresse);
        suggestion.setLat(Double.parseDouble(latString));
        suggestion.setLon(Double.parseDouble(lonString));
        suggestion.setNomUser(nomUser);
        suggestion.setPrenomUser(prenomUser);
        suggestion.setEmailUser(emailUser);

        suggestionService.saveSuggestion(suggestion);
        System.out.println("Suggestion créée avec succès !");
        
    }

}



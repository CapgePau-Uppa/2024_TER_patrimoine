package TER.Backend;


import java.util.List;
import java.util.Scanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import TER.Backend.security.entity.User;
import TER.Backend.security.service.UserService;



@SpringBootApplication
public class BackendApplication{ //implements CommandLineRunner 

    public static void main(String[] args) {
        System.out.println("BACKEND DEMARRÉ");

        //SpringApplication.run(BackendApplication.class, args);
        ConfigurableApplicationContext context = SpringApplication.run(BackendApplication.class, args);
        UserService userService = context.getBean(UserService.class);
        boolean ok=true;
        Scanner scanner = new Scanner(System.in);

        while (ok){
            System.out.println("1. Créer un propriétaire");
            System.out.println("2. Lister les users");
            System.out.println("3. Quitter");
            System.out.print("Votre choix : ");
            int choix = scanner.nextInt();
            scanner.nextLine();
            switch (choix) {
                case 1:
                    createProprietaire(scanner, userService);
                    break;
                case 2:
                    listUsers(userService);
                    break;
                case 3:
                    ok = false;
                    break;
                default:
                    System.out.println("Choix invalide");
            }
        }
        scanner.close();
    }

    private static List<User> listUsers(UserService userService) {
        List<User> users = userService.findAllUsers();
        for (User user : users) {
            System.out.println(user);
        }        
        return users; // Ajout du retour de valeur
    }
    

    private static void createProprietaire(Scanner scanner, UserService userService) {
        System.out.print("Nom: ");
        String nom = scanner.nextLine();
        System.out.print("Prenom : ");
        String prenom = scanner.nextLine();
        System.out.print("Email : ");
        String email = scanner.nextLine();
        System.out.print("Mot de passe : ");
        String mdp = scanner.nextLine();
        userService.saveOwner(nom, prenom, email, mdp);
        System.out.println("Propriétaire créé avec succès !");
        
        
    }
    

}



package TER.Backend;

import java.util.List;
import java.util.Scanner;

import TER.Backend.security.entities.User;
import TER.Backend.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import TER.Backend.services.BatimentService;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private BatimentService batimentService;
    @Autowired
    private UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        /*Scanner scanner = new Scanner(System.in);
        System.out.println("Entrez le nom : ");
        String nom = scanner.nextLine();
        System.out.println("Entrez le prénom : ");
        String prenom = scanner.nextLine();
        System.out.println("Entrez le rôle : ");
        String role = scanner.nextLine();
        System.out.println("Entrez l'email : ");
        String email = scanner.nextLine();
        System.out.println("Entrez le mot de passe : ");
        String mdp = scanner.nextLine();

        User newUser = new User();
        newUser.setNom(nom);
        newUser.setPrenom(prenom);
        newUser.setRole(role);
        newUser.setEmail(email);
        newUser.setMdp(mdp);

        // Sauvegarde de l'utilisateur
        User savedUser = userService.saveUser(newUser);

        // Vérification de l'utilisateur sauvegardé
        System.out.println("Utilisateur enregistré : " + savedUser);

        // Fermeture du scanner
        scanner.close();
        */
        
        /*// Appelez la méthode getBatimentsByType avec le type spécifié
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
        }*/
        System.out.println("test");
    }
}



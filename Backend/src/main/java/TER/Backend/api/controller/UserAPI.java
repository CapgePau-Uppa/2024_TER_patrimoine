package TER.Backend.api.controller;

import TER.Backend.security.entities.User;
import TER.Backend.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://http://localhost:4200/"})
public class UserAPI {
    @Autowired
    private UserService userService;

    public UserAPI(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody String email, @RequestBody String password) {
        // Utiliser le service pour vérifier les informations de connexion
        User user = userService.getUserByEmailAndMdp(email, password);

        if (user != null) {
            // Si l'utilisateur est trouvé, retournez-le avec un statut OK
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            // Sinon, retournez un statut non autorisé
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}

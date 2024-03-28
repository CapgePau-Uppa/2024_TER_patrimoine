package TER.Backend.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.UserDTO;
import TER.Backend.security.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://http://localhost:4200/"})
public class UserAPI {
    @Autowired
    private UserService userService;

    @PostMapping("/inscription")
    public ResponseEntity<String> inscriptionUser(@RequestBody UserDTO userDto) {
        try {
            userService.saveUser(userDto.getNom(), userDto.getPrenom(), userDto.getEmail(), userDto.getMdp());
            return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur créé avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping("/nouveau-admin")
    public ResponseEntity<String> inscriptionAdmin(@RequestBody UserDTO userDto) {
        try {
            userService.saveAdmin(userDto.getNom(), userDto.getPrenom(), userDto.getEmail(), userDto.getMdp());
            return ResponseEntity.status(HttpStatus.CREATED).body("Admin créé avec succès.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok("Connexion réussie.");
    }
}
    


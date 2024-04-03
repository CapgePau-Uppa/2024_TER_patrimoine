package TER.Backend.api.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.ConnexionRequest;
import TER.Backend.api.dto.UserDTO;
import TER.Backend.security.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:4200/"})
public class UserAPI {
    @Autowired
    private UserService userService;

    @PostMapping("/inscription")
    public ResponseEntity<Object> inscriptionUser(@RequestBody UserDTO userDto) {
        try {
            userService.saveUser(userDto.getNom(), userDto.getPrenom(), userDto.getEmail(), userDto.getMdp());
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Utilisateur créé avec succès."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
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


    @PostMapping("/connexion")
    public boolean connexion(@RequestBody ConnexionRequest request) {
        return userService.connexion(request.getEmail(), request.getMdp()) != null;
    }

    @GetMapping("/role")
    public ResponseEntity<Map<String, String>> getRoleByEmail(@RequestParam String email) {
    String role = userService.getRoleByEmail(email); 
    if (role != null) {
        Map<String, String> response = new HashMap<>();
        response.put("role", role);
        return ResponseEntity.ok(response);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error", "Email non trouvé"));
    }
}
}
    


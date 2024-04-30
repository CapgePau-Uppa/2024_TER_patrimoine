package TER.Backend.security.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import TER.Backend.api.dto.UserDTO;
import TER.Backend.security.entity.User;
import TER.Backend.security.entity.Role;
import TER.Backend.security.repository.UserRepository;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    // Find user
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDTO getByEmail(String email) {
    User user = userRepository.findByEmail(email);
    return new UserDTO(user);
    }

    // Liste des utilisateurs et des admins
    public List<User> findAllUsers() {
        return userRepository.findAllByRole(Role.USER);
    }
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAllByRole(Role.USER);
        return users.stream()
                    .map(user -> new UserDTO(user))
                    .collect(Collectors.toList());
    }

    public List<User> findAllAdmins() {
        return userRepository.findAllByRole(Role.ADMIN);
    }
    public List<UserDTO> getAllAdmins() {
        List<User> admins = userRepository.findAllByRole(Role.ADMIN);
        return admins.stream()
                    .map(admin -> new UserDTO(admin))
                    .collect(Collectors.toList());
    }  

    // Connexion
    public UserDTO connexion(String email, String mdp){
        //Verifier si l'utilisateur existe
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(mdp, user.getMdp())) {
            UserDTO userDTO = new UserDTO();
            userDTO.setEmail(user.getEmail()); // Envoie de l'email de l'utilisateur connecté pour le front
            return userDTO;
        } else {
            return null;
        }
    }

    // Inscription
    public User saveUser(String nom, String prenom, String email, String mdp) {
        //Verifier si l'utilisateur existe, pour ne pas avoir deux utilisateurs avec le meme email
        User user = userRepository.findByEmail(email);
        if(user!=null) throw  new RuntimeException("Cet utilisateur existe deja ");
        user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setMdp(passwordEncoder.encode(mdp)); 
        user.setRole(Role.USER); 
        return userRepository.save(user);
    }

    public User saveAdmin(String nom, String prenom, String email, String mdp) {
        //Verifier si l'admin existe
        User user = userRepository.findByEmail(email);
        if(user!=null) throw  new RuntimeException("Cet admin existe deja ");
        user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setMdp(passwordEncoder.encode(mdp)); 
        user.setRole(Role.ADMIN); 
        return userRepository.save(user);
    }

    public User saveOwner(String nom, String prenom, String email, String mdp) {
        /* Vérifier s'il y a déjà un propriétaire dans la base de données
        User existingOwner = userRepository.findByRole(Role.OWNER);
        if (existingOwner != null) throw new RuntimeException("Un propriétaire existe déjà.");
        // Vérifier si un utilisateur avec cet email existe déjà*/
        User user = userRepository.findByEmail(email);
        if (user != null) throw new RuntimeException("Un utilisateur avec cet email existe déjà.");
        
        // Créer le propriétaire
        user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setEmail(email);
        user.setMdp(passwordEncoder.encode(mdp)); 
        user.setRole(Role.OWNER); 
        return userRepository.save(user);
    }
    

    // Trouvez le role d'un utilisateur
    public String getRoleByEmail(String email) {
        return userRepository.findRoleByEmail(email);
    }


    // Grant role admin
    public User grantUserRoleAdmin(Long userId) {
        // Récupérer l'utilisateur par son ID
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        user.setRole(Role.ADMIN);
        return userRepository.save(user);
    }
    
    
}

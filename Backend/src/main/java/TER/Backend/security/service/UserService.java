package TER.Backend.security.service;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import TER.Backend.api.dto.SuggestionDTO;
import TER.Backend.api.dto.UserDTO;
import TER.Backend.security.entity.User;
import TER.Backend.security.entity.User.Role;
import TER.Backend.security.repository.UserRepository;

@Service
public class UserService{

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public UserDTO getByEmail(String email) {
    User user = userRepository.findByEmail(email);
    return new UserDTO(user);
}

    public UserDTO connexion(String email, String mdp){
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(mdp, user.getMdp())) {
            UserDTO userDTO = new UserDTO();
            //userDTO.setId(user.getId());
            userDTO.setEmail(user.getEmail());
            //userDTO.setNom(user.getNom());
            //userDTO.setPrenom(user.getPrenom());
            //userDTO.setRole(user.getRole().name());
            return userDTO;
        } else {
            return null;
        }
    }
    

    public User saveUser(String nom, String prenom, String email, String mdp) {
        // Tout d'abord vérifier si l'utilisateur existe
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
        // Tout d'abord vérifier si l'admin existe
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

    // Trouvez le role d'un utilisateur
    public String getRoleByEmail(String email) {
        return userRepository.findRoleByEmail(email);
    }
    
    
}

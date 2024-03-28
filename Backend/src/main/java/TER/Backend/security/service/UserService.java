package TER.Backend.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import TER.Backend.security.entity.User;
import TER.Backend.security.entity.User.Role;
import TER.Backend.security.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
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

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur non trouvé avec l'adresse e-mail: " + email);
        }
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getMdp())
            .roles(user.getRole().name()) // Assurez-vous que getRole() retourne un enum Role
            .build();
    }
    
}

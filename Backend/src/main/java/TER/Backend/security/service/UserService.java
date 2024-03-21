package TER.Backend.security.service;

import TER.Backend.security.entities.User;
import TER.Backend.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public User getUserByEmailAndMdp(String email, String mdp) {
        return userRepository.findByEmailAndMdp(email, mdp);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public User createUser(String nom, String prenom, String role,String email, String mdp) {
        User user = new User();
        user.setNom(nom);
        user.setPrenom(prenom);
        user.setRole(role);
        user.setEmail(email);
        user.setMdp(mdp);
        return userRepository.save(user);
    }
}

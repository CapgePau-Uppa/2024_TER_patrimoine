package TER.Backend.api.dto;

import TER.Backend.security.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String mdp;

    public UserDTO(User user) {
        id = user.getId();
        nom = user.getNom();
        prenom = user.getPrenom();
        email = user.getEmail();
        mdp = user.getMdp();
    }
    
    
}

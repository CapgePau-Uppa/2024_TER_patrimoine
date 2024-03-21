package TER.Backend.security.repository;

import TER.Backend.entities.Batiment;
import TER.Backend.security.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.mdp = :mdp")
    User findByEmailAndMdp(String email, String mdp);

    @Override
    <S extends User> S save(S User);
}

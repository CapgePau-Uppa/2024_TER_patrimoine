package TER.Backend.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import TER.Backend.security.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    @Query("SELECT u.role FROM User u WHERE u.email = :email")
    String findRoleByEmail(String email);
    
}
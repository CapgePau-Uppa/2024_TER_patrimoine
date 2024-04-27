package TER.Backend.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import TER.Backend.security.entity.User;
import TER.Backend.security.entity.Role;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findByRole(Role role);
    List<User> findAllByRole(Role role);
    @Query("SELECT u.role FROM User u WHERE u.email = :email")
    String findRoleByEmail(String email);
    
    
}
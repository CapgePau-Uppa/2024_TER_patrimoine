package TER.Backend.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TER.Backend.entities.Suggestion;

@Repository
public interface SuggestionsRepository extends JpaRepository<Suggestion, Long> {
        
    @Override
    <S extends Suggestion> S save(S suggestion);
    Suggestion findByNomBatiment(String nomBatiment);
    Optional<Suggestion> findById(Long id);
    void deleteById(Long id);
    List<Suggestion> findAll();
    List<Suggestion> findByDateCreation(LocalDateTime dateCreation);
    

    
}

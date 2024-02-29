package TER.Backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import TER.Backend.entities.Coordonnees;

@Repository
public interface CoordonneesRepository extends JpaRepository<Coordonnees, Long> {

    @Override
    <S extends Coordonnees> S save(S coordonnees);
}


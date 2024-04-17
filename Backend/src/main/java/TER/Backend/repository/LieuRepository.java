package TER.Backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import TER.Backend.entities.Lieu;
import java.util.List;

@Repository
public interface LieuRepository extends JpaRepository<Lieu, Long> {

   @Override
    <S extends Lieu> S save(S lieu);

    //Tous les departements par region
    @Query("SELECT DISTINCT l.departement FROM Lieu l WHERE l.region = :region")
    List<String> findDistinctDepartementsByRegion(String region);

    //Toutes les communes par departement
    @Query("SELECT DISTINCT l.commune FROM Lieu l WHERE l.departement = :departement")
    List<String> findDistinctCommunesByDepartement(String departement);

}

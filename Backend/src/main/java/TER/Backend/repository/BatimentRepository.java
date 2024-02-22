package TER.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import TER.Backend.entities.Batiment;
import TER.Backend.entities.Coordonnees;

@Repository
public interface BatimentRepository extends JpaRepository<Batiment, Long> {

    Batiment findByNom(String nom);

    /*@Query("SELECT b.nom, c.lat, c.lon FROM Batiment b JOIN b.coordonnees c")
    List<Object[]> findAllBatimentsWithCoordonnees();*/
    @Query("SELECT c.lat, c.lon FROM Batiment b JOIN b.coordonnees c WHERE b.id = :id")
    Optional<Object[]> findCoordonneesByBatimentId(@Param("id") Long batimentId);

    @Override
    <S extends Batiment> S save(S batiment);
    
    @Override
    <S extends Batiment> List<S> saveAll(Iterable<S> batiments);

}

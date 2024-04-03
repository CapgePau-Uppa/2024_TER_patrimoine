package TER.Backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import TER.Backend.entities.Batiment;

@Repository
public interface BatimentRepository extends JpaRepository<Batiment, Long> {

    Batiment findByNom(String nom);
    Batiment findByReference(String reference);
    @Query("SELECT b FROM Batiment b WHERE b.type = :type")
    List<Batiment> findByType(String type);
    /*@Query("SELECT b.nom, c.lat, c.lon FROM Batiment b JOIN b.coordonnees c")
    List<Object[]> findAllBatimentsWithCoordonnees();*/
    @Query("SELECT c.lat, c.lon FROM Batiment b JOIN b.coordonnees c WHERE b.id = :id")
    Optional<Object[]> findCoordonneesByBatimentId(@Param("id") Long batimentId);
    @Query("SELECT l.region FROM Batiment b JOIN b.lieu l WHERE b.id = :id")
    String findRegionByBatimentId(@Param("id") Long batimentId);
    @Query("SELECT l.commune FROM Batiment b JOIN b.lieu l WHERE b.id = :id")
    String findCommuneByBatimentId(@Param("id") Long batimentId);
    @Query("SELECT l.departement FROM Batiment b JOIN b.lieu l WHERE b.id = :id")
    String findDepartementByBatimentId(@Param("id") Long batimentId);
    @Query("SELECT b FROM Batiment b JOIN b.lieu l WHERE l.commune = :commune")
    List<Batiment> findByCommune(@Param("commune") String commune);
    @Query("SELECT b FROM Batiment b JOIN b.lieu l WHERE l.departement = :departement")
    List<Batiment> findByDepartement(@Param("departement") String dep);
    @Query("SELECT b FROM Batiment b JOIN b.lieu l WHERE l.region = :region")
    List<Batiment> findByRegion(@Param("region") String region);
    List<Batiment> findByNomContainingIgnoreCase(String nom);
    List<Batiment> findByTypeContaining(String type);

    

    @Override
    <S extends Batiment> S save(S batiment);
    
    @Override
    <S extends Batiment> List<S> saveAll(Iterable<S> batiments);

    
    //Tous les types des batiments
    @Query("SELECT DISTINCT b.type FROM Batiment b")
    List<String> findDistinctTypes();
    //Toutes les regions
    @Query("SELECT DISTINCT l.region FROM Lieu l")
    List<String> findDistinctRegions();
    //Toutes les communes
    @Query("SELECT DISTINCT l.commune FROM Lieu l")
    List<String> findDistinctCommunes(); 
    //Tous les Departements
    @Query("SELECT DISTINCT l.departement FROM Lieu l")
    List<String> findDistinctDepartements();
    //Tous les types de statuts
    @Query("SELECT DISTINCT b.statut FROM Batiment b")
    List<String> findDistinctStatut();
    //Affichage des marqueurs sur la carte par département
    //@Query("SELECT l.departement, COUNT(b), MIN(c.lat), MIN(c.lon) FROM Batiment b JOIN b.lieu l JOIN b.coordonnees c GROUP BY l.departement")
    @Query("SELECT l.departement, COUNT(b.id), c.lat, c.lon FROM Batiment b " +
       "JOIN b.lieu l " +
       "JOIN b.coordonnees c " +
       "GROUP BY l.departement")
    List<Object[]> countAndFirstBuildingCoordinatesByDepartement();
    


}

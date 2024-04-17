package TER.Backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import TER.Backend.api.dto.SuggestionDTO;
import TER.Backend.entities.Batiment;
import TER.Backend.entities.Coordonnees;
import TER.Backend.entities.EtatSuggestion;
import TER.Backend.entities.Lieu;
import TER.Backend.entities.Suggestion;
import TER.Backend.repository.BatimentRepository;
import TER.Backend.repository.CoordonneesRepository;
import TER.Backend.repository.LieuRepository;
import TER.Backend.repository.SuggestionRepository;
import jakarta.persistence.EntityNotFoundException;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private BatimentRepository batimentRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private CoordonneesRepository coordonneesRepository;

    public SuggestionService(SuggestionRepository suggestionRepository) {
        this.suggestionRepository = suggestionRepository;
    }

    // Save suggestion
    public Suggestion saveSuggestion(Suggestion suggestion) {
        return suggestionRepository.save(suggestion);
    }

    // Delete suggestion
    public void deleteSuggestion(Long id) {
        suggestionRepository.deleteById(id);
    }

    // Get suggestion by id
    public Suggestion findSuggestionById(Long id) {
        return suggestionRepository.findById(id).get();
    }
    public SuggestionDTO getSuggestionById(Long id) {
        Suggestion suggestion = suggestionRepository.findById(id)
                            .orElseThrow(() -> new NoSuchElementException("Suggestion inexistante"));
        return new SuggestionDTO(suggestion);
    }


    // Get suggestion by name
    public Suggestion findSuggestionByNom(String nomBatiment) {
        return suggestionRepository.findByNomBatiment(nomBatiment);
    }
    public SuggestionDTO getSuggestionByNom(String nomBatiment) {
        Suggestion suggestion = suggestionRepository.findByNomBatiment(nomBatiment);;
        if (suggestion == null) {
            throw new NoSuchElementException("Suggestion inexistante");
        }
        return new SuggestionDTO(suggestion);
    }

    // Get all suggestions
    public List<Suggestion> findAllSuggestions() {
        return suggestionRepository.findAll();
    }
    public List<SuggestionDTO> getAllSuggestions() {
        List<Suggestion> suggestions = suggestionRepository.findAll();
        return suggestions.stream()
                        .map(suggestion -> new SuggestionDTO(suggestion))
                        .collect(Collectors.toList());
    }

    // Get suggestions by etat
    public List<Suggestion> findAllSuggestionsByEtat(EtatSuggestion etat) {
        return suggestionRepository.findByEtat(etat);
    }
    public List<SuggestionDTO> getAllSuggestionsByEtat(EtatSuggestion etat) {
        List<Suggestion> suggestions = suggestionRepository.findByEtat(etat);
        return suggestions.stream()
                        .map(suggestion -> new SuggestionDTO(suggestion))
                        .collect(Collectors.toList());
    }
    // Get suggestions by date
    public List<Suggestion> findSuggestionsByDate(LocalDateTime dateCreation) {
        return suggestionRepository.findByDateCreation(dateCreation);
    }
    public List<SuggestionDTO> getSuggestionsByDate(LocalDateTime dateCreation) {
        List<Suggestion> suggestions = suggestionRepository.findByDateCreation(dateCreation);
        return suggestions.stream()
                        .map(suggestion -> new SuggestionDTO(suggestion))
                        .collect(Collectors.toList());
    }

    // Sauvegarder une suggestion en batiment
    public void saveSuggestionAsBatiment(Suggestion suggestion) {
        //Sauvegarder le lieu
        Lieu lieu = new Lieu();
        lieu.setRegion(suggestion.getRegion());
        lieu.setDepartement(suggestion.getDepartement());
        lieu.setCommune(suggestion.getCommune());
        lieuRepository.save(lieu);

        // Sauvegarder les coordonnées
        Coordonnees coordonnees = new Coordonnees();
        coordonnees.setLat(suggestion.getLat());
        coordonnees.setLon(suggestion.getLon());
        coordonneesRepository.save(coordonnees);
        
        // Créer le Batiment
        Batiment batiment = new Batiment();
        batiment.setReference(suggestion.getReference());
        batiment.setNom(suggestion.getNomBatiment());
        batiment.setType(suggestion.getType());
        batiment.setStatut(suggestion.getStatut());
        batiment.setDescription(suggestion.getDescription());
        batiment.setImage("../assets/img/default.png");
        batiment.setEtoile(0);
        batiment.setLieu(lieu);
        batiment.setCoordonnees(coordonnees);

        batimentRepository.save(batiment);
    }

    // Update d'une suggestion pour l'historique 
    public void updateSuggestion(Long suggestionId, String emailAdmin) {
        Suggestion suggestion = suggestionRepository.findById(suggestionId)
            .orElseThrow(() -> new EntityNotFoundException("Suggestion not found with id: " + suggestionId));
        suggestion.setEtat(EtatSuggestion.VALIDEE);
        suggestion.setEmailAdmin(emailAdmin);
        suggestionRepository.save(suggestion);
    }

    // Restore de l'historique
    public void restoreSuggestion(Long suggestionId) {
        Suggestion suggestion = suggestionRepository.findById(suggestionId)
            .orElseThrow(() -> new EntityNotFoundException("Suggestion not found with id: " + suggestionId));
       
        // On recupère le batiment associé à la suggestion pour le supprimer
        Batiment batiment = batimentRepository.findBySuggestionId(suggestionId);
        if (batiment != null) {
            batimentRepository.delete(batiment);
        }
        
        // On restaure la suggestion
        suggestion.setEtat(EtatSuggestion.EN_ATTENTE);
        suggestion.setEmailAdmin(null);
        suggestion.setDateCreation(LocalDateTime.now());
        suggestionRepository.save(suggestion);
    }
    
    
}

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
import TER.Backend.entities.Lieu;
import TER.Backend.entities.Suggestion;
import TER.Backend.repository.BatimentRepository;
import TER.Backend.repository.CoordonneesRepository;
import TER.Backend.repository.LieuRepository;
import TER.Backend.repository.SuggestionsRepository;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionsRepository suggestionsRepository;

    @Autowired
    private BatimentRepository batimentRepository;
    @Autowired
    private LieuRepository lieuRepository;
    @Autowired
    private CoordonneesRepository coordonneesRepository;

    public SuggestionService(SuggestionsRepository suggestionsRepository) {
        this.suggestionsRepository = suggestionsRepository;
    }

    // Save suggestion
    public Suggestion saveSuggestion(Suggestion suggestion) {
        return suggestionsRepository.save(suggestion);
    }

    // Delete suggestion
    public void deleteSuggestion(Long id) {
        suggestionsRepository.deleteById(id);
    }

    // Get suggestion by id
    public Suggestion findSuggestionById(Long id) {
        return suggestionsRepository.findById(id).get();
    }
    public SuggestionDTO getSuggestionById(Long id) {
        Suggestion suggestion = suggestionsRepository.findById(id)
                            .orElseThrow(() -> new NoSuchElementException("Suggestion inexistante"));
        return new SuggestionDTO(suggestion);
    }


    // Get suggestion by name
    public Suggestion findSuggestionByNom(String nomBatiment) {
        return suggestionsRepository.findByNomBatiment(nomBatiment);
    }
    public SuggestionDTO getSuggestionByNom(String nomBatiment) {
        Suggestion suggestion = suggestionsRepository.findByNomBatiment(nomBatiment);;
        if (suggestion == null) {
            throw new NoSuchElementException("Suggestion inexistante");
        }
        return new SuggestionDTO(suggestion);
    }

    // Get all suggestions
    public List<Suggestion> findAllSuggestions() {
        return suggestionsRepository.findAll();
    }
    public List<SuggestionDTO> getAllSuggestions() {
        List<Suggestion> suggestions = suggestionsRepository.findAll();
        return suggestions.stream()
                        .map(suggestion -> new SuggestionDTO(suggestion))
                        .collect(Collectors.toList());
    }
    // Get suggestions by date
    public List<Suggestion> findSuggestionsByDate(LocalDateTime dateCreation) {
        return suggestionsRepository.findByDateCreation(dateCreation);
    }
    public List<SuggestionDTO> getSuggestionsByDate(LocalDateTime dateCreation) {
        List<Suggestion> suggestions = suggestionsRepository.findByDateCreation(dateCreation);
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
        batiment.setReference("PS000"+ suggestion.getId());
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

    
    
}

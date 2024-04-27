package TER.Backend.api.controller;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import TER.Backend.api.dto.SuggestionDTO;
import TER.Backend.entities.EtatSuggestion;
import TER.Backend.entities.Suggestion;
import TER.Backend.services.BatimentService;
import TER.Backend.services.SuggestionService;

@RestController
@RequestMapping("/api/suggestion")
@CrossOrigin(origins = {"http://localhost:4200/"})
public class SuggestionAPI {

    @Autowired
    private SuggestionService suggestionService;
    @Autowired
    private BatimentService batimentService;

    public SuggestionAPI(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }
    

    // Get all suggestions
    @GetMapping("/all-suggestions")
    public List<SuggestionDTO> getAllSuggestions() {
        return suggestionService.getAllSuggestions();
    }
    // Get all suggestions en attente
    @GetMapping("/attente-suggestions")
    public List<SuggestionDTO> getAllAttenteSuggestions() {
        return suggestionService.getAllSuggestionsByEtat(EtatSuggestion.EN_ATTENTE);
    }

    // Get suggestion by id
    /*  Ancienne méthode sans vérification des coordonnées
    @GetMapping("/suggestion-by-id/{id}")
    public SuggestionDTO getSuggestionById(@PathVariable Long id) {
        return suggestionService.getSuggestionById(id);
    }
    */
    @GetMapping("/suggestion-by-id/{id}")
    public SuggestionDTO getSuggestionById(@PathVariable Long id) {
        SuggestionDTO suggestionDTO = suggestionService.getSuggestionById(id);

        // Vérifier si les coordonnées de la suggestion existent déjà pour un bâtiment
        Long batimentID = batimentService.findBatimentIdByCoordonnees(suggestionDTO.getLat(), suggestionDTO.getLon());
        if (batimentID != null) {
            // Envoie d'un message avec l'ID du bâtiment existant
            String message = "Ces coordonnées existent déjà pour un bâtiment";
            suggestionDTO.setMessage(message);
            suggestionDTO.setBatimentId(batimentID);
        }

        return suggestionDTO;
    }

    // Get suggestion by date
    @GetMapping("/date-suggestions")
    public List<SuggestionDTO> getSuggestionsByDate(@RequestParam("date")LocalDateTime date) {
        return suggestionService.getSuggestionsByDate(date);
    }

    // Save suggestionn(création d'une suggestion)
    @PostMapping("/save-suggestion")
    public Suggestion saveSuggestion(@RequestBody Suggestion suggestion) {
        return suggestionService.saveSuggestion(suggestion);
    }

    // Save suggestion en batiment 
    @PostMapping("/save-suggestion-as-batiment")
    public ResponseEntity<?> saveSuggestionAsBatiment(@RequestBody Suggestion suggestion) {
        try {
            suggestionService.saveSuggestionAsBatiment(suggestion);
            return ResponseEntity.ok().build(); 
        } catch (Exception e) {
            System.err.println("Une erreur est survenue lors de la sauvegarde : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Une erreur est survenue.");
        }
    }

    // Delete suggestion *non-utilisé*
    @DeleteMapping("/delete-suggestion")
    public void deleteSuggestion(@RequestParam("id") Long id) {
        suggestionService.deleteSuggestion(id);
    }

    /*-------- Historique ---------*/

    // Get all suggestions validées
    @GetMapping("/historique/all-suggestions")
    public List<SuggestionDTO> getAllValideeSuggestions() {
        return suggestionService.getAllSuggestionsByEtat(EtatSuggestion.VALIDEE);
    }


    // Modifier une suggestion pour la mettre dans l'historique
    @PutMapping("/historique/validation-suggestion")
    public ResponseEntity<?> updateSuggestion(@RequestParam Long id,
                                              @RequestParam String emailAdmin) {
        suggestionService.updateSuggestion(id, emailAdmin);
        return ResponseEntity.ok().build();
    }

    // Restaurer une suggestion de l'historique
    @PutMapping("/historique/restauration-suggestion")
    public ResponseEntity<?> restoreSuggestion(@RequestParam Long id) {
        suggestionService.restoreSuggestion(id);
        return ResponseEntity.ok().build();
    }

    /*-------- Corbeille ---------*/

    // Get all suggestions supprimées
    @GetMapping("/corbeille/all-suggestions")
    public List<SuggestionDTO> getAllSupprimeeSuggestions() {
        return suggestionService.getAllSuggestionsByEtat(EtatSuggestion.SUPPRIMEE);
    }

    // Modifier une suggestion pour la mettre dans la corbeille
    @PutMapping("/corbeille/suppression-suggestion")
    public ResponseEntity<?> updateSuggestionForCorbeille(@RequestParam Long id,
                                              @RequestParam String emailAdmin) {
        suggestionService.updateSuggestionForCorbeille(id, emailAdmin);
        return ResponseEntity.ok().build();
    }

    // Restaurer une suggestion de la corbeille
    @PutMapping("/corbeille/restauration-suggestion")
    public ResponseEntity<?> restoreSuggestionFromCorbeille(@RequestParam Long id) {
        suggestionService.restoreSuggestionFromCorbeille(id);
        return ResponseEntity.ok().build();
    }

}

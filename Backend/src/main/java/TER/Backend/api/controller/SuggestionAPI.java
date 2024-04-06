package TER.Backend.api.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.SuggestionDTO;
import TER.Backend.entities.Suggestion;
import TER.Backend.services.SuggestionService;

@RestController
@RequestMapping("/api/suggestion")
@CrossOrigin(origins = {"http://localhost:4200/"})
public class SuggestionAPI {

    @Autowired
    private SuggestionService suggestionService;

    public SuggestionAPI(SuggestionService suggestionService) {
        this.suggestionService = suggestionService;
    }
    

    // Get all suggestions
    @GetMapping("/all-suggestions")
    public List<SuggestionDTO> getAllSuggestions() {
        return suggestionService.getAllSuggestions();
    }

    // Get suggestion by id
    @GetMapping("/suggestion-by-id/{id}")
    public SuggestionDTO getSuggestionById(@PathVariable Long id) {
        return suggestionService.getSuggestionById(id);
    }


    // Get suggestion by date
    @GetMapping("/date-suggestions")
    public List<SuggestionDTO> getSuggestionsByDate(@RequestParam("date")LocalDateTime date) {
        return suggestionService.getSuggestionsByDate(date);
    }

    // Save suggestion
    @PostMapping("/save-suggestion")
    public Suggestion saveSuggestion(@RequestBody Suggestion suggestion) {
        return suggestionService.saveSuggestion(suggestion);
    }

    // Delete suggestion
    @DeleteMapping("/delete-suggestion")
    public void deleteSuggestion(@RequestParam("id") Long id) {
        suggestionService.deleteSuggestion(id);
    }

}

package TER.Backend.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import TER.Backend.api.dto.BatimentDTO;
import TER.Backend.services.BatimentService;

@RestController
@RequestMapping("/api/batiment")
@CrossOrigin(origins = {"http://http://localhost:4200/"})
public class BatimentAPI {

    @Autowired
    private BatimentService batimentService;

    public BatimentAPI(BatimentService batimentService) {
        this.batimentService = batimentService;
    }

    //Get tout les batiments pour ensuite les afficher sur la carte
    @GetMapping
    public List<BatimentDTO> getAllBatiments() {
        return batimentService.getAllBatiments();
    }
    
    
    
    
}

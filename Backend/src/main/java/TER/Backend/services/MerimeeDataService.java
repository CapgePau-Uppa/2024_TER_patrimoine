package TER.Backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import TER.Backend.model.MerimeeData;
import TER.Backend.model.MerimeeDataResponse;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class MerimeeDataService {

    @Autowired
    private RestTemplate restTemplate;

    public List<MerimeeData> recupererDonnees() {
        //Recuperation de 100 elements de la bd gouv
        String apiUrl = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/liste-des-immeubles-proteges-au-titre-des-monuments-historiques/records?limit=100&refine=region:Nouvelle-Aquitaine";

        
        // Reponse sous forme de MerimeeDataResponse
        ResponseEntity<MerimeeDataResponse> responseEntity = restTemplate.exchange(
            apiUrl,
            HttpMethod.GET,
            null,
            MerimeeDataResponse.class
        );

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            MerimeeDataResponse response = responseEntity.getBody();
            if (response != null && response.getResults() != null) {
                return Arrays.asList(response.getResults());
            }
        }

        return Collections.emptyList();
        
        /*
        //Recupération de tout les elements de la bd gouvernementale
        String apiUrl = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/liste-des-immeubles-proteges-au-titre-des-monuments-historiques/exports/json";

        try {
            // Requete pour recuperer les donnees depuis l'API
            ResponseEntity<List<MerimeeData>> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<MerimeeData>>() {}
            );

            // Verification de la reponse de l'API
            if (responseEntity.getStatusCode() == HttpStatus.OK) {
                List<MerimeeData> responseData = responseEntity.getBody();
                if (responseData != null && !responseData.isEmpty()) {
                    return responseData;
                }
            }
        } catch (Exception e) {
            // Gestion des exceptions
            e.printStackTrace();
        }

        return Collections.emptyList(); */
    }
}


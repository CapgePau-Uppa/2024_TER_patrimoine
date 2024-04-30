package TER.Backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonInclude;

/*
* Configuration de RestTemplate pour ajouter un convertisseur JSON 
* et un ObjectMapper pour ignorer les valeurs null lors de la sérialisation JSON
* il est utilisé dans le service MerimeeDataService lors de la récupération des données de l'API Merimé
*/
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // Ajouter un convertisseur JSON
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setObjectMapper(objectMapper());
        restTemplate.getMessageConverters().add(converter);

        return restTemplate;
    }

    @Bean
    public ObjectMapper objectMapper() {
        return Jackson2ObjectMapperBuilder.json()
                .serializationInclusion(JsonInclude.Include.NON_NULL) // Ignorer les valeurs null lors de la sérialisation JSON
                .build();
    }
}


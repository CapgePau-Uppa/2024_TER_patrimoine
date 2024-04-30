package TER.Backend.model;


/*
 * Classe qui permet de récupérer les données de l'API Mérimée utilisé seulement lorsqu'on récupère 100 données ou moins 
*/
public class MerimeeDataResponse {
    private MerimeeData[] results;

    public MerimeeData[] getResults() {
        return results;
    }

    public void setResults(MerimeeData[] results) {
        this.results = results;
    }
}


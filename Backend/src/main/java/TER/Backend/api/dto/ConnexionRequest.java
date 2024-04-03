package TER.Backend.api.dto;

public class ConnexionRequest {
    private String email;
    private String mdp;

    public ConnexionRequest() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }
}

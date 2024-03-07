package TER.Backend.util;

public class ImagesUtil {
    public static String getImageForType(String type) {
        if (type == null) {
            return "../assets/img/default.jpg"; 
        }
        switch (type.toLowerCase()) {
            case "hôtel":
                return "../assets/img/hotel.png";
            case "église":
                return "../assets/img/eglise.png";
            case "abbaye":
                return "../assets/img/abbaye.png";
            case "école":
                return "../assets/img/ecole.png";
            case "château":
                return "../assets/img/chateau.png";
            case "ferme":
                return "../assets/img/eglise.png";
            case "maison":
                return "../assets/img/maison.png";
            default:
                return "../assets/img/default.png"; // Une image par défaut si le type n'est pas trouvé
        }
    }
    
}

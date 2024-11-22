
import config.JpaConfig;
import jakarta.persistence.EntityManager;
import user_management.user.UserService;

public class MainApp {
    public static void main(String[] args) {
        try {
            EntityManager em = JpaConfig.getEntityManager();

            UserService userService = new UserService(em);

            userService.showUserMenu();

            JpaConfig.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


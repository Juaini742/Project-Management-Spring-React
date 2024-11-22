package user_management.user;


import jakarta.persistence.EntityManager;
import order_management.order.OrderService;
import org.mindrot.jbcrypt.BCrypt;
import user_management.address.AddressService;
import user_management.profile.Profile;
import user_management.profile.ProfileRepository;
import user_management.profile.ProfileService;

import java.util.Optional;
import java.util.Scanner;

public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProfileService profileService;
    private final AddressService addressService;
    private final OrderService orderService;

    public UserService(EntityManager entityManager) {
        this.userRepository = new UserRepository(entityManager);
        this.profileRepository = new ProfileRepository(entityManager);
        this.profileService = new ProfileService(entityManager);
        this.addressService = new AddressService(entityManager);
        this.orderService = new OrderService(entityManager);
    }

    public void showUserMenu() {
        Scanner scanner = new Scanner(System.in);
        boolean running = true;

        while (running) {
            System.out.println("1. Register");
            System.out.println("2. Login");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    registerUser();
                    break;
                case 2:
                    loginUser();
                    running = false;
                    break;
                default:
                    System.out.println("Invalid option!");
                    break;
            }
        }
    }


    private void registerUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();

        if (userRepository.findByEmail(email).isPresent()) {
            System.out.println("Email sudah terdaftar!");
        } else {
            createUser(email, password);
        }
    }

    private void createUser(String email, String passwordHash) {
        if (email == null || passwordHash == null) {
            System.out.println("Email or password cannot be null");
            return;
        }

        String hashPassword = BCrypt.hashpw(passwordHash, BCrypt.gensalt());

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPasswordHash(hashPassword);
        newUser.setIsActive(true);

        userRepository.save(newUser);
        System.out.println("User registered successfully!");
    }

    private void loginUser() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter email: ");
        String email = scanner.nextLine();
        System.out.print("Enter password: ");
        String password = scanner.nextLine();


        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (BCrypt.checkpw(password, user.getPasswordHash())) {
            System.out.println("Welcome, " + email);

            Optional<Profile> profile = profileRepository.findByUserId(user.getId());

            if (profile.isPresent()) {
                showUserDashboard(user);
            } else {
                if (profileService.createProfile(user)) {
                    showUserDashboard(user);
                } else {
                    System.out.println("Something went wrong!");
                }
            }
        } else {
            System.out.println("Invalid email or password.");
        }
    }

    private void showUserDashboard(User user) {
        Scanner scanner = new Scanner(System.in);
        boolean loggedIn = true;

        while (loggedIn) {
            System.out.println("=".repeat(30));
            System.out.println("Welcome to your dashboard!");
            System.out.println("1. View user");
            System.out.println("2. Update user");
            System.out.println("3. Enter to Profile menu");
            System.out.println("4. Enter to Address menu");
            System.out.println("5. Order product");
            System.out.println("6. See Order list");
            System.out.println("x. Logout");
            System.out.print("Choose an option: ");
            String choice = scanner.nextLine();

            switch (choice.toLowerCase()) {
                case "1":
                    viewUserProfile(user);
                    break;
                case "2":
                    updateUserProfile(user);
                    break;
                case "3":
                    profileService.profileMenu(user);
                    break;
                case "4":
                    addressService.validateAddress(user);
                    break;
                case "5":
                    orderService.showOrderInput(user);
                    break;
                case "6":
                    orderService.detailOrder(user);
                    break;
                case "x":
                    System.out.println("Logging out...");
                    loggedIn = false;
                    break;
                default:
                    System.out.println("Invalid option!");
                    break;
            }
        }
    }


    private void viewUserProfile(User user) {
        System.out.println("=".repeat(30));
        System.out.println("User Profile");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Active: " + user.getIsActive());
        System.out.println("Created at: " + user.getCreatedAt());
        System.out.println("Updated at: " + user.getUpdatedAt());
        System.out.println("=".repeat(30));
    }

    private void updateUserProfile(User user) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Updating user profile...");

        System.out.print("Enter new email (or press Enter to keep current): ");
        String newEmail = scanner.nextLine();
        if (!newEmail.isEmpty()) {
            user.setEmail(newEmail);
        }

        System.out.print("Enter new password (or press Enter to keep current): ");
        String newPassword = scanner.nextLine();
        if (!newPassword.isEmpty()) {
            user.setPasswordHash(newPassword);
        }

        userRepository.update(user);
        System.out.println("Profile updated successfully!");
    }
}

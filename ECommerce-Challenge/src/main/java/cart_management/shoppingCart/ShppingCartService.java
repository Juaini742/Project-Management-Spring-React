package cart_management.shoppingCart;


import jakarta.persistence.EntityManager;
import user_management.profile.Profile;
import user_management.user.User;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Scanner;

public class ShppingCartService {

    private final ShoppingCartRepository profileRepository;
    private final Scanner scanner = new Scanner(System.in);


    public ShppingCartService(EntityManager entityManager) {
        this.profileRepository = new ShoppingCartRepository(entityManager);
    }

    public void profileMenu(User user) {
        boolean loggedIn = true;

        while (loggedIn) {
            System.out.println("=".repeat(30));
            System.out.println("Welcome to Profile menu dashboard!");
            System.out.println("1. View profile");
            System.out.println("2. Update profile");
            System.out.println("3. Back");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    viewUserProfile(user);
                    break;
                case 2:
                    updateProfile(user);
                    break;
                case 3:
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
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found for user: " + user.getEmail()));

        System.out.println("=".repeat(30));
        System.out.println("Profile Details");
        System.out.println("Email: " + profile.getUser().getEmail());
        System.out.println("First Name: " + profile.getFirstName());
        System.out.println("Last Name: " + profile.getLastName());
        System.out.println("Phone: " + profile.getPhoneNumber());
        System.out.println("Date Of Birth: " + profile.getDateOfBirth().toString());
        System.out.println("=".repeat(30));
    }

    public boolean createProfile(User user) {
        System.out.print("Enter First Name: ");
        String firstName = scanner.nextLine();

        System.out.print("Enter Last Name: ");
        String lastName = scanner.nextLine();

        System.out.print("Enter Phone Number (Optional): ");
        String phoneNumber = scanner.nextLine();
        if (phoneNumber.trim().isEmpty()) {
            phoneNumber = null;
        }

        System.out.print("Enter Date of Birth (yyyy-mm-dd): ");
        String dobString = scanner.nextLine();
        Date dateOfBirth = Date.valueOf(dobString);

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setFirstName(firstName);
        profile.setLastName(lastName);
        profile.setPhoneNumber(phoneNumber);
        profile.setDateOfBirth(dateOfBirth);

        profileRepository.save(profile);
        return true;
    }

    private void updateProfile(User user) {
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found for user: " + user.getEmail()));

        System.out.println("Updating profile...");

        System.out.print("Enter new First Name (or press Enter to keep current): ");
        String firstName = scanner.nextLine();
        if (!firstName.isEmpty()) {
            profile.setFirstName(firstName);
        }

        System.out.print("Enter new Last Name (or press Enter to keep current): ");
        String lastName = scanner.nextLine();
        if (!lastName.isEmpty()) {
            profile.setFirstName(lastName);
        }

        System.out.print("Enter new Phone (or press Enter to keep current): ");
        String phone = scanner.nextLine();
        if (!phone.isEmpty()) {
            profile.setPhoneNumber(phone);
        }

        System.out.print("Enter Date of Birth (yyyy-mm-dd) - (or press Enter to keep current): ");
        String dobString = scanner.nextLine();
        if (!dobString.isEmpty()) {
            Date dateOfBirth = Date.valueOf(dobString);
            profile.setDateOfBirth(dateOfBirth);
        }

        profile.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        profileRepository.update(profile);
        System.out.println("Profile updated successfully!");
    }

}

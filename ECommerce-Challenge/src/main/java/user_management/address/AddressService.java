package user_management.address;

import jakarta.persistence.EntityManager;
import user_management.country.Country;
import user_management.country.CountryRepository;
import user_management.user.User;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Scanner;

public class AddressService {

    private final AddressRepository addressRepository;
    private final CountryRepository countryRepository;
    private final Scanner scanner = new Scanner(System.in);


    public AddressService(EntityManager entityManager) {
        this.addressRepository = new AddressRepository(entityManager);
        this.countryRepository = new CountryRepository(entityManager);
    }

    private Optional<Address> getAddress(User user) {
        return addressRepository.findByUserId(user.getId());
    }

    public void validateAddress(User user) {
        Optional<Address> address = getAddress(user);
        if (address.isPresent()) {
            addressMenu(user);
        } else {
            createAddress(user);
        }
    }

    private void addressMenu(User user) {
        boolean loggedIn = true;

        while (loggedIn) {
            System.out.println("=".repeat(30));
            System.out.println("Welcome to Profile menu dashboard!");
            System.out.println("1. View address detail");
            System.out.println("2. Update address");
            System.out.println("3. Back");
            System.out.print("Choose an option: ");
            int choice = scanner.nextInt();
            scanner.nextLine();

            switch (choice) {
                case 1:
                    viewUserAddress(user);
                    break;
                case 2:
                    updateAddress(user);
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

    private void viewUserAddress(User user) {
        Address address = addressRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found for user: " + user.getEmail()));

        System.out.println("=".repeat(30));
        System.out.println("Profile Details");
        System.out.println("TYPE: " + address.getAddressType().name());
        System.out.println("ADDRESS FIRST LINE: " + address.getAddressLine1());
        System.out.println("ADDRESS SECOND LINE: " + address.getAddressLine2());
        System.out.println("CITY: " + address.getCity());
        System.out.println("STATE: " + address.getState());
        System.out.println("POSTAL CODE: " + address.getPostalCode());
        System.out.println("=".repeat(30));
    }

    private void createAddress(User user) {
        System.out.println("=== Create Address ===");

        System.out.print("Enter Address Type (e.g., home, work): ");
        String addressType = scanner.nextLine();

        System.out.print("Enter Address Line 1: ");
        String addressLine1 = scanner.nextLine();

        System.out.print("Enter Address Line 2 (optional): ");
        String addressLine2 = scanner.nextLine();
        if (addressLine2.trim().isEmpty()) {
            addressLine2 = null;
        }

        System.out.print("Enter City: ");
        String city = scanner.nextLine();

        System.out.print("Enter State: ");
        String state = scanner.nextLine();

        System.out.print("Enter Postal Code: ");
        String postalCode = scanner.nextLine();

        System.out.print("Is this the default address? (true/false): ");
        boolean isDefault = Boolean.parseBoolean(scanner.nextLine());

        System.out.print("Enter Country Name: ");
        Country country = countryRepository.findByName(scanner.nextLine().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Country not found: " + scanner.nextLine()));

        Address address = new Address();
        address.setUser(user);

        switch (addressType.toLowerCase()) {
            case "home" -> address.setAddressType(Address.AddressType.HOME);
            case "work" -> address.setAddressType(Address.AddressType.WORK);
            case "billing" -> address.setAddressType(Address.AddressType.BILLING);
            case "shipping" -> address.setAddressType(Address.AddressType.SHIPPING);
            default -> throw new IllegalArgumentException("Invalid address type: " + addressType);
        }

        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        address.setAddressLine1(addressLine1);
        address.setAddressLine2(addressLine2);
        address.setCity(city);
        address.setState(state);
        address.setPostalCode(postalCode);
        address.setIsDefault(isDefault);
        address.setCreatedAt(currentTimestamp);
        address.setUpdatedAt(currentTimestamp);
        address.setCountry(country);
        addressRepository.save(address);
    }

    private void updateAddress(User user) {
        Address address = addressRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Address not found for user: " + user.getEmail()));

        System.out.println("=== Update Address ===");

        System.out.print("Enter Address Type (e.g., home, work) - (or press Enter to keep current): ");
        String addressType = scanner.nextLine();
        if (!addressType.isEmpty()) {
            switch (addressType.toLowerCase()) {
                case "home" -> address.setAddressType(Address.AddressType.HOME);
                case "work" -> address.setAddressType(Address.AddressType.WORK);
                case "billing" -> address.setAddressType(Address.AddressType.BILLING);
                case "shipping" -> address.setAddressType(Address.AddressType.SHIPPING);
                default -> throw new IllegalArgumentException("Invalid address type: " + addressType);
            }
        }

        System.out.print("Enter Address Line 1 - (or press Enter to keep current): ");
        String addressLine1 = scanner.nextLine();
        if (!addressLine1.isEmpty()) {
            address.setAddressLine1(addressLine1);
        }

        System.out.print("Enter Address Line 2 - (or press Enter to keep current): ");
        String addressLine2 = scanner.nextLine();
        if (!addressLine2.isEmpty()) {
            address.setAddressLine2(addressLine2.trim().isEmpty() ? null : addressLine2);
        }

        System.out.print("Enter City - (or press Enter to keep current): ");
        String city = scanner.nextLine();
        if (!city.isEmpty()) {
            address.setCity(city);
        }

        System.out.print("Enter State - (or press Enter to keep current): ");
        String state = scanner.nextLine();
        if (!state.isEmpty()) {
            address.setState(state);
        }

        System.out.print("Enter Postal Code - (or press Enter to keep current): ");
        String postalCode = scanner.nextLine();
        if (!postalCode.isEmpty()) {
            address.setPostalCode(postalCode);
        }

        System.out.print("Is this the default address? (true/false) - (or press Enter to keep current): ");
        String isDefaultInput = scanner.nextLine();
        if (!isDefaultInput.isEmpty()) {
            address.setIsDefault(Boolean.parseBoolean(isDefaultInput));
        }

        System.out.print("Enter Country Name - (or press Enter to keep current): ");
        String countryName = scanner.nextLine();
        if (!countryName.isEmpty()) {
            Country country = countryRepository.findByName(countryName.toUpperCase())
                    .orElseThrow(() -> new RuntimeException("Country not found: " + countryName));
            address.setCountry(country);
        }

        address.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        addressRepository.update(address);

        System.out.println("Address updated successfully!");
    }


}

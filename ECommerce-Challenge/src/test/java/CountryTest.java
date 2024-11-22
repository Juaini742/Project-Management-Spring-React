import config.JpaConfig;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import user_management.country.Country;
import user_management.country.CountryRepository;

import java.util.List;
import java.util.Locale;

public class CountryTest {

    private CountryRepository countryRepository;

    @Test
    public void testSaveCountry() {
        EntityManager em = JpaConfig.getEntityManager();
        countryRepository = new CountryRepository(em);

        List<Country> countries = List.of(
                new Country("Indonesia", "ID", "+62"),
                new Country("United States", "US", "+1"),
                new Country("Germany", "DE", "+49"),
                new Country("India", "IN", "+91"),
                new Country("Canada", "CA", "+1"),
                new Country("Australia", "AU", "+61"),
                new Country("Brazil", "BR", "+55"),
                new Country("United Kingdom", "GB", "+44"),
                new Country("France", "FR", "+33"),
                new Country("Italy", "IT", "+39"),
                new Country("Japan", "JP", "+81"),
                new Country("South Korea", "KR", "+82"),
                new Country("Mexico", "MX", "+52"),
                new Country("Spain", "ES", "+34"),
                new Country("Russia", "RU", "+7"),
                new Country("China", "CN", "+86"),
                new Country("Argentina", "AR", "+54"),
                new Country("Egypt", "EG", "+20"),
                new Country("South Africa", "ZA", "+27"),
                new Country("Saudi Arabia", "SA", "+966"),
                new Country("Turkey", "TR", "+90"),
                new Country("Thailand", "TH", "+66"),
                new Country("Malaysia", "MY", "+60"),
                new Country("Vietnam", "VN", "+84"),
                new Country("Singapore", "SG", "+65"),
                new Country("Sweden", "SE", "+46"),
                new Country("Netherlands", "NL", "+31"),
                new Country("Belgium", "BE", "+32"),
                new Country("Switzerland", "CH", "+41"),
                new Country("Norway", "NO", "+47")
        );

        List<Country> upperCountries = countries.stream().map(data ->
                new Country(
                        data.getName().toUpperCase(),
                        data.getCode(),
                        data.getPhoneCode()
                )
        ).toList();

        upperCountries
                .forEach(country -> countryRepository.save(country));
    }

}

package user_management.country;


import jakarta.persistence.EntityManager;

import java.util.Optional;


public class CountryRepository {

    private final EntityManager entityManager;

    public CountryRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Country country) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(country);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<Country> findByName(String name) {
        try {
            Country country = entityManager.createQuery("SELECT c FROM Country c WHERE c.name = :name", Country.class)
                    .setParameter("name", name)
                    .getSingleResult();
            return Optional.of(country);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save Address", e);
        }
    }


    public void update(Country country) {
        entityManager.merge(country);
    }
}

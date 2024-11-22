package user_management.address;


import jakarta.persistence.EntityManager;
import user_management.profile.Profile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;


public class AddressRepository {

    private final EntityManager entityManager;

    public AddressRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Address address) {
        try {
            entityManager.getTransaction().begin();
            address.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
            address.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
            entityManager.persist(address);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<Address> findByUserId(Integer userId) {
        try {
            Address address = entityManager.createQuery("SELECT a FROM Address a WHERE a.user.id = :userId", Address.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
            return Optional.of(address);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void update(Address address) {
        entityManager.merge(address);
    }
}

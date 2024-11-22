package cart_management.shoppingCart;


import jakarta.persistence.EntityManager;
import user_management.profile.Profile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;


public class ShoppingCartRepository {

    private final EntityManager entityManager;

    public ShoppingCartRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Profile profile) {
        try {
            entityManager.getTransaction().begin();
            profile.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
            profile.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
            entityManager.persist(profile);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<Profile> findByUserId(Integer userId) {
        try {
            Profile profile = entityManager.createQuery("SELECT p FROM Profile p WHERE p.user.id = :userId", Profile.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
            return Optional.of(profile);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void update(Profile profile) {
        entityManager.merge(profile);
    }
}

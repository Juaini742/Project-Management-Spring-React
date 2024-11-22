package user_management.user;


import jakarta.persistence.EntityManager;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;


public class UserRepository {

    private final EntityManager entityManager;

    public UserRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(User user) {
        try {
            entityManager.getTransaction().begin();
            user.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
            user.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
            entityManager.persist(user);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<User> findByEmail(String email) {
        try {
            User user = entityManager.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
            return Optional.of(user);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public void update(User user) {
        entityManager.merge(user);
    }
}

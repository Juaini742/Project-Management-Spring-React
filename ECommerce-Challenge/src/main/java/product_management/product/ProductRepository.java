package product_management.product;


import jakarta.persistence.EntityManager;
import user_management.profile.Profile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


public class ProductRepository {

    private final EntityManager entityManager;

    public ProductRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Product product) {
        try {
            entityManager.getTransaction().begin();
            product.setCreatedAt(LocalDateTime.now());
            product.setUpdatedAt(LocalDateTime.now());
            entityManager.persist(product);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public List<Product> findAll() {
        try {
            return entityManager.createQuery("SELECT p FROM Product p", Product.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    public List<Product> findAllWithProductVariant() {
        try {
            return entityManager.createQuery(
                            "SELECT p FROM Product p JOIN FETCH p.productVariant", Product.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }


    public Optional<Product> findByProductId(Integer productId) {
        try {
            List<Product> products = entityManager.createQuery("SELECT p FROM Product p WHERE p.id = :productId", Product.class)
                    .setParameter("productId", productId)
                    .getResultList();

            if (products.isEmpty()) {
                return Optional.empty();
            }

            return Optional.of(products.get(0));
        } catch (Exception e) {
            return Optional.empty();
        }
    }


    public void update(Profile profile) {
        entityManager.merge(profile);
    }
}

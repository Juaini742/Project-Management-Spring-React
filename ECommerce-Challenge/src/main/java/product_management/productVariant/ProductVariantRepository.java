package product_management.productVariant;


import jakarta.persistence.EntityManager;
import product_management.product.Product;
import user_management.profile.Profile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


public class ProductVariantRepository {

    private final EntityManager entityManager;

    public ProductVariantRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(ProductVariant pv) {
        try {
            entityManager.getTransaction().begin();
            pv.setCreatedAt(LocalDateTime.now());
            pv.setUpdatedAt(LocalDateTime.now());
            entityManager.persist(pv);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public List<ProductVariant> findAll() {
        try {
            return entityManager.createQuery("SELECT p FROM ProductVariant p", ProductVariant.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}

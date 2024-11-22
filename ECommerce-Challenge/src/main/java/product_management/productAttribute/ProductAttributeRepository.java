package product_management.productAttribute;


import jakarta.persistence.EntityManager;
import product_management.product.Product;
import user_management.profile.Profile;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


public class ProductAttributeRepository {

    private final EntityManager entityManager;

    public ProductAttributeRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(ProductAttribute pa) {
        try {
            entityManager.getTransaction().begin();
            pa.setCreatedAt(LocalDateTime.now());
            entityManager.persist(pa);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public List<ProductAttribute> findAll() {
        try {
            return entityManager.createQuery("SELECT pa FROM ProductAttribute pa", ProductAttribute.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}

package product_management.productAttributeValue;


import jakarta.persistence.EntityManager;
import product_management.productAttribute.ProductAttribute;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


public class ProductAttributeValueRepository {

    private final EntityManager entityManager;

    public ProductAttributeValueRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(ProductAttributeValue pav) {
        try {
            entityManager.getTransaction().begin();
            pav.setCreatedAt(LocalDateTime.now());
            entityManager.persist(pav);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public List<ProductAttributeValue> findAll() {
        try {
            return entityManager.createQuery("SELECT pav FROM ProductAttributeValue pav", ProductAttributeValue.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}

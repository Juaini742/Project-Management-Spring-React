package product_management.productVariantAttibute;


import jakarta.persistence.EntityManager;
import product_management.productVariant.ProductVariant;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;


public class ProductVariantAttributeRepository {

    private final EntityManager entityManager;

    public ProductVariantAttributeRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(ProductVariantAttribute pvt) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(pvt);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public List<ProductVariantAttribute> findAll() {
        try {
            return entityManager.createQuery("SELECT pva FROM ProductVariantAttribute pva", ProductVariantAttribute.class)
                    .getResultList();
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

}

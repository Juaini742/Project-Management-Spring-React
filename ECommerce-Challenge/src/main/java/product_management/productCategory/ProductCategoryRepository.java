package product_management.productCategory;


import jakarta.persistence.EntityManager;
import user_management.country.Country;

import java.util.Optional;


public class ProductCategoryRepository {

    private final EntityManager entityManager;

    public ProductCategoryRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(ProductCategory pc) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(pc);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<ProductCategory> findBySlug(String slug) {
        try {
            ProductCategory pc = entityManager.createQuery("SELECT pc FROM ProductCategory pc WHERE pc.slug = :slug", ProductCategory.class)
                    .setParameter("slug", slug)
                    .getSingleResult();
            return Optional.of(pc);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save Address", e);
        }
    }

}

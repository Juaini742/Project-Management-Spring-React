package order_management.orderItem;


import jakarta.persistence.EntityManager;


public class OrderItemRepository {

    private final EntityManager entityManager;

    public OrderItemRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(OrderItem orderItem) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(orderItem);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

}

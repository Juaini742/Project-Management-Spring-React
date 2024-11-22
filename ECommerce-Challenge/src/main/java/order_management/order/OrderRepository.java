package order_management.order;


import jakarta.persistence.EntityManager;
import order_management.orderItem.OrderItem;
import user_management.profile.Profile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


public class OrderRepository {
    private final EntityManager entityManager;

    public OrderRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void save(Order order) {
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(order);
            entityManager.getTransaction().commit();
        } catch (Exception e) {
            if (entityManager.getTransaction().isActive()) {
                entityManager.getTransaction().rollback();
            }
            throw new RuntimeException("Failed to save customer", e);
        }
    }

    public Optional<Order> findByUserId(Integer userId) {
        try {
            Order order = entityManager.createQuery("SELECT o FROM Order o WHERE o.user.id = :userId", Order.class)
                    .setParameter("userId", userId)
                    .getSingleResult();
            return Optional.of(order);
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public List<OrderItem> findOrderAndOrderItemByUserId(Integer userId) {
        try {
            List<OrderItem> orderItems = entityManager.createQuery(
                            "SELECT oi FROM OrderItem oi " +
                                    "JOIN FETCH oi.order o " +
                                    "JOIN FETCH oi.productVariant pv " +
                                    "WHERE o.user.id = :userId", OrderItem.class)
                    .setParameter("userId", userId)
                    .getResultList();
            return orderItems;
        } catch (Exception e) {
            return List.of();
        }
    }



    public void update(Order order) {
        entityManager.merge(order);
    }
}
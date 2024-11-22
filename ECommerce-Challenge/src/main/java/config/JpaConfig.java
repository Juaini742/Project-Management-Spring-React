package config;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Persistence;
public class JpaConfig {
    private final static ThreadLocal<EntityManager> threadLocalEntityManager = new ThreadLocal<>();

    public static EntityManager getEntityManager() {
        EntityManager em = threadLocalEntityManager.get();
        if (em == null || !em.isOpen()) {
            em = Persistence.createEntityManagerFactory("default").createEntityManager();
            threadLocalEntityManager.set(em);
        }
        return em;
    }

    public static void close() {
        EntityManager em = threadLocalEntityManager.get();
        if (em != null && em.isOpen()) {
            em.close();
        }
    }
}

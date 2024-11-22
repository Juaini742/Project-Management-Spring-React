package com.core.backend.project;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query(value = "SELECT p FROM Project p WHERE p.created_by.id = :created_by")
    List<Project> findAllByCreatedBy(String created_by);

    @Query("""
            SELECT DISTINCT p FROM Project p
            LEFT JOIN FETCH p.members m
            WHERE m.user.id = :userId
            """)
    List<Project> findAllByUserId(@Param("userId") String userId);

}

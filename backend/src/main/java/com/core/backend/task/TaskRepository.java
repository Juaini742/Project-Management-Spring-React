package com.core.backend.task;

import com.core.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, String> {
    @Query("SELECT t FROM Task t WHERE t.project.id = :projectId")
    List<Task> findAllByProjectId(String projectId);

    @Query("SELECT t FROM Task t JOIN t.assignedUsers u WHERE u.id = :userId")
    List<Task> findAllByAssignedTo(@Param("userId") String userId);

}

package com.core.backend.task_completion;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskCompletionRepository extends JpaRepository<TaskCompletion, String> {
    List<TaskCompletion> findByUserIdAndTaskId(String userId, String taskId);
}

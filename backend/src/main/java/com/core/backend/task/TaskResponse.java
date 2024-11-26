package com.core.backend.task;

import java.sql.Timestamp;
import java.util.List;

public record TaskResponse(String id, String own, List<TaskDetails> tasks) {

    record TaskDetails(
            String id,
            String name,
            String description,
            String status,
            String priority,
            Timestamp startDate,
            Timestamp endDate,
            List<AssignedToDetails> assignedTo
    ) {
    }

    record AssignedToDetails(
            String email,
            Boolean isDone
    ) {
    }
}

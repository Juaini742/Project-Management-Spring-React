package com.core.backend.project;

import com.core.backend.project_member.ProjectMember;

import java.math.BigDecimal;
import java.sql.Timestamp;


public record ProjectResponse<T>(T data) {

    record ProjectDetails(
            String projectId,
            String name,
            String description,
            Boolean is_group_chat_enabled,
            Timestamp startDate,
            Timestamp endDate,
            String category,
            BigDecimal budget,
            Integer progress,
            Integer estimated_hours,
            Integer actual_hours,
            String color,
            String tag,
            ProjectMember.Member_role role
    ) {
    }
}


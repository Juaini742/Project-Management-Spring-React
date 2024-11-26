package com.core.backend.project_member;

import java.sql.Timestamp;

public record ProjectMemberResponse<T>(
        T data,
        Pagination pagination
) {

    public record MemberData(
            String id,
            String userId,
            String projectName,
            String email,
            String name,
            String role,
            Timestamp joinedAt
    ) {
    }

    public record Pagination(
            int page,
            int totalPages,
            long totalElements
    ) {
    }
}


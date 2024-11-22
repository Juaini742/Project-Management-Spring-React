package com.core.backend.projectMembe;

import java.sql.Timestamp;

public record ProjectMemberResponse(String id, String userId, String projectName, String email, String role, Timestamp joined_at) {

}

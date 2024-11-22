package com.core.backend.project;

import java.util.List;


public record ProjectResponse(String id, String email, List<ProjectDetails> projects) {

    record ProjectDetails(String projectId, String createdId, String name, String description, boolean is_group_chat_enabled) {
    }
}


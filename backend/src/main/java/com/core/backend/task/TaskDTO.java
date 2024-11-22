package com.core.backend.task;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
import com.core.backend.interfaces.onUpdate;
import com.core.backend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {

    @NotBlank(message = "field is required")
    private String projectId;

    @NotBlank(message = "field is required")
    private String name;

    @NotBlank(message = "field is required")
    private String description;

    @NotBlank(message = "field is required")
    private String status;

    @NotBlank(message = "field is required")
    private String priority;

    @NotBlank(message = "field is required")
    private String assignedTo;

    @NotBlank(message = "field is required")
    private String deadline;
}

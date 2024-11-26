package com.core.backend.project;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onUpdate;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    public ProjectDTO(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    private String id;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String name;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String description;

    private boolean isGroupChatEnabled;

    private String createdBy;

    @PastOrPresent(message = "Start date must be in the past or present", groups = {onCreate.class, onUpdate.class})
    private Timestamp startDate;

    @FutureOrPresent(message = "End date must be in the future or present", groups = {onCreate.class, onUpdate.class})
    private Timestamp endDate;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String category;

    @DecimalMin(value = "0.0", inclusive = false, message = "Budget must be greater than zero", groups = {onCreate.class, onUpdate.class})
    private BigDecimal budget;

    @Min(value = 0, message = "Progress must be at least 0", groups = {onCreate.class, onUpdate.class})
    @Max(value = 100, message = "Progress cannot exceed 100", groups = {onCreate.class, onUpdate.class})
    private int progress;

    @Min(value = 0, message = "Estimated hours must be at least 0", groups = {onCreate.class, onUpdate.class})
    private int estimatedHours;

    @Min(value = 0, message = "Actual hours must be at least 0", groups = {onCreate.class, onUpdate.class})
    private int actualHours;

    private String color;

    private String tags;

    private Timestamp createdAt;

    private Timestamp updatedAt;
}
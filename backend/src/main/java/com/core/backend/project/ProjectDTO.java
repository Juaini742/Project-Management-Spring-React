package com.core.backend.project;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onUpdate;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDTO {

    private String id;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String name;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String description;
}

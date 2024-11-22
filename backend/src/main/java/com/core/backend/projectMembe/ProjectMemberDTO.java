package com.core.backend.projectMembe;


import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectMemberDTO {

    @NotBlank(message = "field is required", groups = onDelete.class)
    private String id;

    @NotBlank(message = "field is required", groups = {onCreate.class, onDelete.class})
    private String projectId;

    @NotBlank(message = "field is required", groups = onCreate.class)
    private String memberId;

    @NotBlank(message = "field is required", groups = onCreate.class)
    private String role;
}

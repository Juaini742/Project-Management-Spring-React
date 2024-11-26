package com.core.backend.project_member;


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
public class ProjectMemberDTO {

    private String id;

    @NotBlank(message = "field is required", groups = {onCreate.class})
    private String projectId;

    @NotBlank(message = "field is required", groups = onCreate.class)
    private String memberId;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class})
    private String role;
}

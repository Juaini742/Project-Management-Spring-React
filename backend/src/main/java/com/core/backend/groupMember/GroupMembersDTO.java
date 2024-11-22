package com.core.backend.groupMember;


import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
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
public class GroupMembersDTO {

    @NotBlank(message = "field is required", groups = onDelete.class)
    private String id;

    @NotBlank(message = "field is required", groups = onCreate.class)
    private String member_id;

    @NotBlank(message = "field is required", groups = {onCreate.class, onUpdate.class, onDelete.class})
    private String group_id;

    @NotBlank(message = "field is required", groups = onCreate.class)
    private String roleGroup;

    @NotBlank(message = "field is required", groups = onUpdate.class)
    private String statusGroup;
}

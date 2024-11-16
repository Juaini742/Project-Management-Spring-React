package com.core.backend.friend;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FriendDTO {

    @NotBlank(message = "field is required")
    private String email;

    private String status;


}

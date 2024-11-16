package com.core.backend.user;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    @Column(unique = true)
    @NotNull(message = "email is required")
    @Size(min = 1, message = "email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "password is required")
    @Size(min = 8, message = "password must be at least 8 characters")
    private String password;

    private Role role;
}

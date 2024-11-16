package com.core.backend.profile;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileDTO {
    @NotNull(message = "full name is required")
    @Size(min = 1, message = "full name is required")
    private String full_name;

    @NotNull(message = "address is required")
    @Size(min = 1, message = "address is required")
    private String address;

    @NotNull(message = "job is required")
    @Size(min = 1, message = "job is required")
    private String job;

    private String profile_image;
}

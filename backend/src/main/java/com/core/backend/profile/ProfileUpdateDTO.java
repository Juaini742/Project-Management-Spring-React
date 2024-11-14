package com.core.backend.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileUpdateDTO {
    private String full_name;
    private String address;
    private String job;
    private String profile_image;
}

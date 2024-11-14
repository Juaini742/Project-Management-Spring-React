package com.core.backend.profile;


import com.core.backend.auth.AuthResponse;

public record ProfileResponse(String fullName, String address, String job, String profileImage, AuthResponse user) {

    public static ProfileResponse fromProfile(Profile profile) {
        return new ProfileResponse(profile.getFull_name(), profile.getAddress(), profile.getJob(), profile.getProfile_image(), new AuthResponse(profile.getUser().getId(), profile.getUser().getEmail(), profile.getUser().getRole()));
    }
}



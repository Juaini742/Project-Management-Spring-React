package com.core.backend.profile;

public record ProfileResponse(String fullName, String address, String job, String profileImage) {

    public static ProfileResponse fromProfile(Profile profile) {
        return new ProfileResponse(profile.getFull_name(), profile.getAddress(), profile.getJob(), profile.getProfile_image());
    }
}



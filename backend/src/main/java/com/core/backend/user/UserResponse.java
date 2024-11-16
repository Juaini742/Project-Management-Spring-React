package com.core.backend.user;

import com.core.backend.profile.Profile;

public record UserResponse(String id, String email, Role role, Profile profile) {
}

package com.core.backend.auth;

import com.core.backend.user.Role;

public record AuthResponse(String id, String email, Role role) {
}

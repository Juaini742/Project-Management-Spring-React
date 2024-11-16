package com.core.backend.friend;

import com.core.backend.user.Role;

import java.util.List;

public record FriendResponse(String userId, String email, Role role, List<FriendDetailResponse> friends) { }


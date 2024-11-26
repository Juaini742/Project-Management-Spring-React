package com.core.backend.user;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.friend.Friend;
import com.core.backend.friend.FriendRepository;
import com.core.backend.project_member.ProjectMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UserService {

    private final AuthService authService;
    private final AuthRepository authRepository;
    private final FriendRepository friendRepository;
    private final ProjectMemberRepository projectMemberRepository;

    public User getMe() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<UserResponse> getAvailableUserForProject(String userId, String projectId) {

        List<String> friendIds = friendRepository.findAllByUserId(userId).stream()
                .map(data -> data.getFriend().getId())
                .toList();

        List<String> memberIds = projectMemberRepository.findByProjectId(projectId)
                .stream().map(data -> data.getUser().getId()).toList();

        return authRepository.findByIdInAndIdNotIn(friendIds, memberIds).stream().map(data ->
                new UserResponse(
                        data.getId(),
                        data.getEmail(),
                        data.getRole(),
                        null
                )).toList();
    }

    public List<UserResponse> findAllUserNotFriend() {
        User user = getMe();
        List<User> users = authRepository.findAlUserNotFriend(user.getId(), List.of(Friend.Status.PENDING, Friend.Status.ACCEPTED));
        if (users.isEmpty()) {
            return Collections.emptyList();
        }
        return users.stream().map(data ->
                new UserResponse(
                        data.getId(),
                        data.getEmail(),
                        data.getRole(),
                        null
                )).toList();
    }


}

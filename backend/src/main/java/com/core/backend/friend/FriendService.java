package com.core.backend.friend;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.SimpleTimeZone;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class FriendService {

    private final FriendRepository friendRepository;
    private final AuthService authService;
    private final AuthRepository authRepository;

    private User getUser() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Unauthorized"));
    }

    private User getFriend(String email) {
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Friend not found"));
    }

    public void create(FriendDTO friendEmail) {
        User user = getUser();
        User friend = getFriend(friendEmail.getEmail());

        Friend friendRequest = Friend.builder()
                .user(user)
                .friend(friend)
                .status(Friend.Status.PENDING)
                .build();
        friendRepository.save(friendRequest);
    }

    public void accept(String email) {
        User user = getUser();
        User friend = getFriend(email);
        Optional<Friend> friendRequest = friendRepository.findByUserAndFriend(user, friend);

        if (friendRequest.isPresent()) {
            Friend friendRequest1 = friendRequest.get();
            friendRequest1.setStatus(Friend.Status.ACCEPTED);
            friendRepository.save(friendRequest1);
        }
    }

    public void rejected(String email) {
        User user = getUser();
        User friend = getFriend(email);
        Optional<Friend> friendRequest = friendRepository.findByUserAndFriend(user, friend);

        if (friendRequest.isPresent()) {
            Friend friendRequest1 = friendRequest.get();
            friendRepository.deleteById(friendRequest1.getId());
        }
    }

    public FriendResponse getFriend() {
        User user = getUser();
        List<FriendDetailResponse> friendDetailResponses = user.getFriends().stream()
                .map(friend -> {
                    User userFriend = friend.getFriend();
                    return new FriendDetailResponse(
                            friend.getId(),
                            userFriend.getId(),
                            userFriend.getEmail(),
                            friend.getStatus().name()
                    );
                }).collect(Collectors.toList());

        return new FriendResponse(user.getId(), user.getEmail(), user.getRole(), friendDetailResponses);
    }

    public void deleteFriend(String id) {
        if (friendRepository.findById(id).isEmpty()) {
            throw new RuntimeException("Friend not found");
        }

        friendRepository.deleteById(id);
    }

}

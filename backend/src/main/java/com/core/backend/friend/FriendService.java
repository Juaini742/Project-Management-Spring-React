package com.core.backend.friend;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
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
        Optional<Friend> friendRequest = friendRepository.findByUserAndFriend(friend, user);

        if (friendRequest.isPresent()) {
            Friend userToFriend = friendRequest.get();
            userToFriend.setStatus(Friend.Status.ACCEPTED);
            friendRepository.save(userToFriend);

            Friend friendToUser = Friend.builder()
                    .user(userToFriend.getFriend())
                    .friend(userToFriend.getUser())
                    .status(Friend.Status.ACCEPTED)
                    .build();
            friendRepository.save(friendToUser);
        } else {
            throw new RuntimeException("Friend not found");
        }
    }

    public void rejected(String email) {
        User user = getUser();
        User friend = getFriend(email);
        Optional<Friend> friendRequest = friendRepository.findByUserAndFriend(user, friend);

        if (friendRequest.isPresent()) {
            Friend userToFriend = friendRequest.get();
            friendRepository.delete(userToFriend);

            Optional<Friend> reverseFriendRequest = friendRepository.findByUserAndFriend(friend, user);

            if (reverseFriendRequest.isPresent()) {
                Friend friendToUser = reverseFriendRequest.get();
                friendRepository.delete(friendToUser);
            } else {
                System.out.println("Reverse relationship not found.");
            }
        } else {
            throw new RuntimeException("Friend not found");
        }
    }

    public FriendResponse getFriend() {
        User user = getUser();
        List<Friend> userFriends = friendRepository.findFriendStatus(user.getId(), Friend.Status.ACCEPTED);

        if (userFriends.isEmpty()) {
            new FriendResponse(user.getId(), user.getEmail(), user.getRole(), Collections.emptyList());
        }

        return getFriendResponse(user, userFriends);
    }

    public FriendResponse getPendingFriend() {
        User user = getUser();

        List<Friend> pendingFriends = friendRepository.findUserStatus(user.getId(), Friend.Status.PENDING);

        if (pendingFriends.isEmpty()) {
            new FriendResponse(user.getId(), user.getEmail(), user.getRole(), Collections.emptyList());
        }

        return getUserResponse(user, pendingFriends);
    }

    private FriendResponse getFriendResponse(User user, List<Friend> userFriends) {
        List<FriendDetailResponse> friendDetailResponses = userFriends.stream()
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

    private FriendResponse getUserResponse(User user, List<Friend> userFriends) {
        List<FriendDetailResponse> friendDetailResponses = userFriends.stream()
                .map(friend -> {
                    User userFriend = friend.getUser();
                    return new FriendDetailResponse(
                            friend.getId(),
                            userFriend.getId(),
                            userFriend.getEmail(),
                            friend.getStatus().name()
                    );
                }).collect(Collectors.toList());

        return new FriendResponse(user.getId(), user.getEmail(), user.getRole(), friendDetailResponses);
    }

    public void deleteFriendById(String id) {
        User user = getUser();
        Friend friend = friendRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Friend not found"));

        Optional<Friend> friendRequest = friendRepository.findByUserAndFriend(user, friend.getFriend());

        if (friendRequest.isPresent()) {
            Friend userToFriend = friendRequest.get();
            friendRepository.delete(userToFriend);

            Optional<Friend> reverseFriendRequest = friendRepository.findByUserAndFriend(friend.getFriend(), user);

            if (reverseFriendRequest.isPresent()) {
                Friend friendToUser = reverseFriendRequest.get();
                friendRepository.delete(friendToUser);
            } else {
                System.out.println("Reverse relationship not found.");
            }
        }
    }

}

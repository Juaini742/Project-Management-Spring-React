package com.core.backend.friend;

import com.core.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, String> {
    Optional<Friend> findByUserAndFriend(User user, User friend);

}


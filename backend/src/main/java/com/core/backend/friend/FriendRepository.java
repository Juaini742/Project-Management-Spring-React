package com.core.backend.friend;

import com.core.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, String> {
    Optional<Friend> findByUserAndFriend(User user, User friend);

    @Query("SELECT f FROM Friend f WHERE f.status = :status AND f.user.id = :userId")
    List<Friend> findFriendStatus(@Param("userId") String userId, @Param("status") Friend.Status status);

    @Query("SELECT f FROM Friend f WHERE f.status = :status AND f.friend.id = :userId")
    List<Friend> findUserStatus(@Param("userId") String userId, @Param("status") Friend.Status status);

    List<Friend> findAllByUserId(String userId);
}


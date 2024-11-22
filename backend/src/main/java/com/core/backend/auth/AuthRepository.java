package com.core.backend.auth;

import com.core.backend.friend.Friend;
import com.core.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface AuthRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    List<User> findByIdInAndIdNotIn(List<String> friendIds, List<String> memberIds);

    @Query("""
                SELECT u
                FROM User u
                WHERE u.id != :userId
                  AND u.id NOT IN (
                      SELECT f.friend.id
                      FROM Friend f
                      WHERE f.user.id = :userId
                        AND f.status IN (:statuses)
                  )
                  AND u.id NOT IN (
                      SELECT f.user.id
                      FROM Friend f
                      WHERE f.friend.id = :userId
                        AND f.status IN (:statuses)
                  )
            """)
    List<User> findAlUserNotFriend(@Param("userId") String userId, @Param("statuses") List<Friend.Status> statuses);


}

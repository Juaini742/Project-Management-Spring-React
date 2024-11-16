package com.core.backend.groupMember;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupMembersRepository extends JpaRepository<GroupMember, String> {
    List<GroupMember> findByGroupId(String groupId);

    @Query("SELECT gm FROM GroupMember gm WHERE gm.user.id = :userId AND gm.group.id = :groupId")
    Optional<GroupMember> findByUserIdAndGroupId(String userId, String groupId);

    Optional<Object> findByUserId(@NotBlank(message = "field is required") String memberId);
}

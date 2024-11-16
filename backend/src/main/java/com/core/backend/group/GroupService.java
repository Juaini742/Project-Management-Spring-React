package com.core.backend.group;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.groupMember.GroupMember;
import com.core.backend.groupMember.GroupMembersRepository;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GroupService {

    private final GroupRepository groupRepository;
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final GroupMembersRepository groupMembersRepository;

    private User getUser() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Groups> getAllGroups() {
        User user = getUser();
        return groupRepository.findAllByUserId(user.getId());
    }

    public Groups createGroup(GroupDTO groupDTO) {
        User user = getUser();
        Groups group = Groups.builder()
                .group_name(groupDTO.getGroup_name())
                .user(user)
                .created_at(new Timestamp(System.currentTimeMillis()))
                .updated_at(new Timestamp(System.currentTimeMillis()))
                .build();
        Groups res = groupRepository.save(group);

        GroupMember groupMember = GroupMember.builder()
                .group(group)
                .user(user)
                .roleGroup(GroupMember.RoleGroup.ADMIN)
                .statusGroup(GroupMember.StatusGroup.ACCEPTED)
                .joined_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        groupMembersRepository.save(groupMember);

        return res;
    }

    public Groups updateName(String id, GroupDTO groupDTO) {
        Groups group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setGroup_name(groupDTO.getGroup_name());
        group.setUpdated_at(new Timestamp(System.currentTimeMillis()));
        group.setId(id);
        return groupRepository.save(group);
    }

    public void deleteGroup(String id) {
        if (!groupRepository.existsById(id)) {
            throw new RuntimeException("Group not found");
        }
        User use = getUser();
        GroupMember groupMemberStatus = groupMembersRepository.findByUserIdAndGroupId(use.getId(), id)
                .orElseThrow(() -> new RuntimeException("You are not a member of this group"));

        if (groupMemberStatus.getRoleGroup().equals(GroupMember.RoleGroup.ADMIN)) {
            List<GroupMember> groupMember = groupMembersRepository.findByGroupId(id);

            groupMembersRepository.deleteAll(groupMember);
            groupRepository.deleteById(id);
        } else {
            throw new RuntimeException("You are not an admin of this group");
        }
    }
}

package com.core.backend.groupMember;

import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.group.GroupRepository;
import com.core.backend.group.Groups;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GroupMemberService {

    private final AuthService authService;
    private final GroupMembersRepository groupMemberRepository;
    private final GroupRepository groupRepository;
    private final AuthRepository authRepository;

    public List<GroupMemberResponse> getAllMemberByGroup(String groupId) {
        List<GroupMember> gm = groupMemberRepository.findByGroupId(groupId);
        return gm.stream().map(data -> new GroupMemberResponse(
                data.getId(),
                data.getGroup().getGroup_name(),
                data.getUser().getEmail(),
                data.getRoleGroup().name(),
                data.getJoined_at()
        )).collect(Collectors.toList());
    }

    private User getUser() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public GroupMemberResponse addMember(GroupMembersDTO groupMembersDTO) {
        User user = getUser();
        Optional<GroupMember> optionalGroupMember = groupMemberRepository
                .findByUserIdAndGroupId(user.getId(), groupMembersDTO.getGroup_id());

        if (optionalGroupMember.isPresent()) {
            GroupMember admin = optionalGroupMember.get();

            if (!admin.getRoleGroup().equals(GroupMember.RoleGroup.ADMIN)) {
                throw new RuntimeException("You are not admin, you cannot add new member");
            }
            if (groupMemberRepository.findByUserId(groupMembersDTO.getMember_id()).isPresent()) {
                throw new RuntimeException("User already in group");
            }

            User member = authRepository.findById(groupMembersDTO.getMember_id())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Groups group = groupRepository.findById(groupMembersDTO.getGroup_id())
                    .orElseThrow(() -> new RuntimeException("Group not found"));

            GroupMember groupMember = GroupMember.builder()
                    .group(group)
                    .user(member)
                    .statusGroup(GroupMember.StatusGroup.PENDING)
                    .joined_at(Timestamp.valueOf(LocalDateTime.now()))
                    .build();

            if (groupMembersDTO.getRoleGroup().equalsIgnoreCase("admin")) {
                groupMember.setRoleGroup(GroupMember.RoleGroup.ADMIN);
            } else if (groupMembersDTO.getRoleGroup().equalsIgnoreCase("member")) {
                groupMember.setRoleGroup(GroupMember.RoleGroup.MEMBER);
            } else {
                throw new RuntimeException("Role not found");
            }
            groupMemberRepository.save(groupMember);
            return new GroupMemberResponse(
                    groupMember.getId(),
                    groupMember.getGroup().getGroup_name(),
                    groupMember.getUser().getEmail(),
                    groupMember.getRoleGroup().name(),
                    groupMember.getJoined_at());
        } else {
            throw new RuntimeException("Group not exists, forbidden to add new member");
        }
    }

    public void updateStatus(GroupMembersDTO groupMembersDTO) {
        User user = getUser();
        Optional<GroupMember> optionalGroupMember = groupMemberRepository
                .findByUserIdAndGroupId(user.getId(), groupMembersDTO.getGroup_id());
        if (optionalGroupMember.isPresent()) {
            GroupMember groupMember = optionalGroupMember.get();

            if (groupMembersDTO.getStatusGroup().equalsIgnoreCase("accepted")) {
                groupMember.setStatusGroup(GroupMember.StatusGroup.ACCEPTED);
                groupMember.setJoined_at(Timestamp.valueOf(LocalDateTime.now()));
                groupMemberRepository.save(groupMember);

            } else if (groupMembersDTO.getStatusGroup().equalsIgnoreCase("rejected")) {
                groupMemberRepository.delete(groupMember);
            } else {
                throw new RuntimeException("Something error");
            }
        } else {
            throw new RuntimeException("Group not exists, cannot update member status");
        }
    }

    public void exitGroup(GroupMembersDTO groupMembersDTO) {
        User user = getUser();
        Optional<GroupMember> optionalGroupMember = groupMemberRepository
                .findByUserIdAndGroupId(user.getId(), groupMembersDTO.getGroup_id());

        if (optionalGroupMember.isPresent()) {
            GroupMember groupMember = optionalGroupMember.get();
            List<GroupMember> adminMembers = groupMemberRepository
                    .findByGroupId(groupMembersDTO.getGroup_id())
                    .stream()
                    .filter(member -> member.getRoleGroup().name().equals(GroupMember.RoleGroup.ADMIN.name()))
                    .toList();

            if (adminMembers.size() == 1 &&
                    groupMember.getRoleGroup().name().equals(GroupMember.RoleGroup.ADMIN.name())) {
                throw new RuntimeException("You are the only admin in this group, you cannot exit the group");
            }

            groupMemberRepository.delete(groupMember);
        } else {
            throw new RuntimeException("Group not exists, cannot exit group");
        }
    }


}

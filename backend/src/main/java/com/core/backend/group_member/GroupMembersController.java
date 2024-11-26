package com.core.backend.group_member;


import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
import com.core.backend.interfaces.onUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/group-members")
@Validated
public class GroupMembersController {

    private final GroupMemberService groupMemberService;

    @GetMapping("/{groupId}")
    public ResponseEntity<List<GroupMemberResponse>> getAllMemberByGroup(@PathVariable String groupId) {
        return ResponseEntity.ok(groupMemberService.getAllMemberByGroup(groupId));
    }

    @PostMapping
    public ResponseEntity<GroupMemberResponse> createGroupMember(@Validated({onCreate.class}) @RequestBody GroupMembersDTO groupMembersDTO) {
        GroupMemberResponse gb = groupMemberService.addMember(groupMembersDTO);
        return ResponseEntity.ok(gb);
    }

    @PutMapping
    public ResponseEntity<String> updateStatus(@Validated(onUpdate.class) @RequestBody GroupMembersDTO groupMembersDTO) {
        groupMemberService.updateStatus(groupMembersDTO);
        return ResponseEntity.ok("Status updated successfully");
    }

    @DeleteMapping
    public ResponseEntity<String> exitGroup(@Validated(onDelete.class) @RequestBody GroupMembersDTO groupMembersDTO) {
        groupMemberService.exitGroup(groupMembersDTO);
        return ResponseEntity.ok("Exit from group successfully");
    }
}

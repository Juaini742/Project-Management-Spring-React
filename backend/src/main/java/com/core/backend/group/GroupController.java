package com.core.backend.group;


import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Validated
@RequestMapping("/api/secured/group")
public class GroupController {

    private final GroupService groupService;


    @GetMapping
    public ResponseEntity<List<Groups>> getGroupById() {
        List<Groups> groupsList = groupService.getAllGroups();
        return ResponseEntity.ok(groupsList);
    }

    @PostMapping
    public ResponseEntity<Groups> createGroup(@Valid @RequestBody GroupDTO groupDTO) {
        Groups groups = groupService.createGroup(groupDTO);
        return ResponseEntity.ok(groups);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Groups> updateGroupName(@PathVariable String id, @RequestBody GroupDTO groupDTO) {
        Groups response = groupService.updateName(id, groupDTO);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGroup(@PathVariable String id) {
        groupService.deleteGroup(id);
        return ResponseEntity.ok("Group deleted successfully");
    }
}

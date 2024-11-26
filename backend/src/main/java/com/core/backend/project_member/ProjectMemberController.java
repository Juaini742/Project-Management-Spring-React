package com.core.backend.project_member;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/project-member")
@Validated
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectMemberResponse<?>> getProjectMemberByProjectId(
            @PathVariable String projectId,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String role,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        ProjectMemberResponse<?> searchResult = projectMemberService
                .getAllProjectMember(projectId, email, name, role, pageable);

        return ResponseEntity.ok(searchResult);
    }

    @PostMapping
    public ResponseEntity<ProjectMemberResponse<?>> createProjectMember(@Validated(onCreate.class) @RequestBody ProjectMemberDTO projectMemberDTO) {
        ProjectMemberResponse<?> pmr = projectMemberService.addProjectMember(projectMemberDTO);
        return ResponseEntity.ok(pmr);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectMemberResponse<?>> updateMemberRole(
            @PathVariable String id,
            @Validated(onUpdate.class) @RequestBody ProjectMemberDTO projectMemberDTO) {
        ProjectMemberResponse<ProjectMemberResponse.MemberData> response = projectMemberService.updateMemberStatus(id, projectMemberDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping
    public ResponseEntity<String> exitFromProject(@RequestParam String id, @RequestParam String projectId) {
        projectMemberService.deleteMember(id, projectId);
        return ResponseEntity.ok("Exit from project successfully");
    }
}

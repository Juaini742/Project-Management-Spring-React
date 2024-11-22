package com.core.backend.projectMembe;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/project-member")
@Validated
public class ProjectMemberController {

    private final ProjectMemberService projectMemberService;

    @GetMapping("/{projectId}")
    public ResponseEntity<List<ProjectMemberResponse>> getProjectMemberByProjectId(@PathVariable String projectId) {
        return ResponseEntity.ok(projectMemberService.getAllProjectMember(projectId));
    }

    @PostMapping
    public ResponseEntity<ProjectMemberResponse> createProjectMember(@Validated(onCreate.class) @RequestBody ProjectMemberDTO projectMemberDTO) {
        ProjectMemberResponse pmr = projectMemberService.addProjectMember(projectMemberDTO);
        return ResponseEntity.ok(pmr);
    }

    @DeleteMapping
    public ResponseEntity<String> exitFromProject(@Validated(onDelete.class) @RequestBody ProjectMemberDTO projectMemberDTO) {
        projectMemberService.exitProject(projectMemberDTO);
        return ResponseEntity.ok("Exit from project successfully");
    }
}

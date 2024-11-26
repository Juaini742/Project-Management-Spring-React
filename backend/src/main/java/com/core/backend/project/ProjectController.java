package com.core.backend.project;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/project")
@Validated
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ProjectResponse<?>> getAllProjectByUserId() {
        return ResponseEntity.ok(projectService.getAllProjectByUserId());
    }

    @GetMapping("/{id}/data")
    public ResponseEntity<ProjectResponse<?>> getProjectById(@PathVariable("id") String id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @GetMapping("/member")
    public ResponseEntity<List<ProjectAndMemberResponse>> getAllProjectAndMemberByCreatedBy() {
        return ResponseEntity.ok(projectService.getAllProjectAndMember());
    }

    @PostMapping
    public ResponseEntity<String> createProject(@Validated(onCreate.class) @RequestBody ProjectDTO projectDTO) {
        projectService.createProject(projectDTO);
        return ResponseEntity.ok("Project created successfully");
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable String projectId, @Validated(onUpdate.class) @RequestBody ProjectDTO projectDTO) {
        ProjectDTO project = projectService.updateProject(projectId, projectDTO);
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok("Project deleted successfully");
    }

}

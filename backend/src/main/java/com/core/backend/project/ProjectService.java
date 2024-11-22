package com.core.backend.project;

import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.projectMembe.ProjectMember;
import com.core.backend.projectMembe.ProjectMemberRepository;
import com.core.backend.projectMembe.ProjectMemberResponse;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RequiredArgsConstructor
@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final ProjectMemberRepository projectMemberRepository;

    private User getUser() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ProjectDTO getProjectById(String id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return new ProjectDTO(project.getId(), project.getName(), project.getDescription());
    }

    public List<ProjectAndMemberResponse> getAllProjectAndMember() {
        User user = getUser();
        List<Project> projects = projectRepository.findAllByUserId(user.getId());
        return projects.stream().map(project -> {
                    ProjectMember.Member_role role = project.getMembers().stream()
                            .filter(members -> members.getUser().getId().equals(user.getId()))
                            .map(ProjectMember::getRole)
                            .findFirst()
                            .orElse(null);

                    return new ProjectAndMemberResponse(
                            project.getId(),
                            project.getName(),
                            project.getDescription(),
                            role
                    );
                }
        ).toList();
    }

    public ProjectResponse getAllProjectByUserId() {
        User user = getUser();
        List<Project> projects = projectRepository
                .findAllByCreatedBy(user.getId());

        if (projects.isEmpty()) {
            return new ProjectResponse(
                    user.getId(),
                    user.getEmail(),
                    Collections.emptyList()
            );
        }

        return new ProjectResponse(
                projects.get(0).getCreated_by().getId(),
                projects.get(0).getCreated_by().getEmail(),
                projects.stream().map(project -> new ProjectResponse.ProjectDetails(
                        project.getId(),
                        project.getCreated_by().getId(),
                        project.getName(),
                        project.getDescription(),
                        project.is_group_chat_enabled()
                )).toList()
        );
    }

    public void createProject(ProjectDTO projectDTO) {
        Project project = Project.builder()
                .name(projectDTO.getName())
                .description(projectDTO.getDescription())
                .created_by(getUser())
                .is_group_chat_enabled(false)
                .created_at(new Timestamp(System.currentTimeMillis()))
                .updated_at(new Timestamp(System.currentTimeMillis()))
                .build();
        projectRepository.save(project);

        ProjectMember projectMember = ProjectMember.builder()
                .user(project.getCreated_by())
                .role(ProjectMember.Member_role.MANAGER)
                .project(project)
                .joined_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        projectMemberRepository.save(projectMember);
    }

    public ProjectDTO updateProject(String projectId, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setUpdated_at(new Timestamp(System.currentTimeMillis()));

        projectRepository.save(project);
        return new ProjectDTO(projectId, project.getName(), project.getDescription());
    }

    public void deleteProject(String id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }

        User user = getUser();
        ProjectMember projectMemberRole = projectMemberRepository.findByUserIdAndProjectId(user.getId(), id)
                .orElseThrow(() -> new RuntimeException("You are not a participant of this project"));

        if (projectMemberRole.getRole().equals(ProjectMember.Member_role.MANAGER)) {
            List<ProjectMember> projectMembers = projectMemberRepository.findByProjectId(id);

            projectMemberRepository.deleteAll(projectMembers);
            projectRepository.deleteById(id);
        } else {
            throw new RuntimeException("You are not a manager of this project");
        }
    }
}
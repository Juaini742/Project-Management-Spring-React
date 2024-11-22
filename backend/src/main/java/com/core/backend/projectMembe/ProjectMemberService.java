package com.core.backend.projectMembe;

import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.project.Project;
import com.core.backend.project.ProjectRepository;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ProjectMemberService {

    private final ProjectMemberRepository projectMemberRepository;
    private final AuthService auhService;
    private final AuthRepository authRepository;
    private final ProjectRepository projectRepository;

    public List<ProjectMemberResponse> getAllProjectMember(String projectId) {
        return projectMemberRepository
                .findByProjectId(
                        projectId).stream().map(data ->
                        new ProjectMemberResponse(
                                data.getId(),
                                data.getUser().getId(),
                                data.getProject().getName(),
                                data.getUser().getEmail(),
                                data.getRole().name(),
                                data.getJoined_at())).toList();
    }

    private User getUser() {
        String email = auhService.getEmailToken();
        return authRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }


    public ProjectMemberResponse addProjectMember(ProjectMemberDTO projectMemberDTO) {
        User user = getUser();
        Optional<ProjectMember> optionalProjectMember = projectMemberRepository.findByUserIdAndProjectId(user.getId(), projectMemberDTO.getProjectId());

        if (optionalProjectMember.isPresent()) {
            ProjectMember manager = optionalProjectMember.get();

            if (!manager.getRole().equals(ProjectMember.Member_role.MANAGER)) {
                throw new RuntimeException("You are not manager, you cannot add new member");
            }

            if (projectMemberRepository.findByUserIdAndProjectId(projectMemberDTO.getMemberId(), projectMemberDTO.getProjectId()).isPresent()) {
                throw new RuntimeException("User already in group");
            }

            User member = authRepository.findById(projectMemberDTO.getMemberId()).orElseThrow(() -> new RuntimeException("User not found"));

            Project project = projectRepository.findById(projectMemberDTO.getProjectId()).orElseThrow(() -> new RuntimeException("Group not found"));

            ProjectMember projectMember = ProjectMember.builder().project(project).user(member).joined_at(Timestamp.valueOf(LocalDateTime.now())).build();

            if (projectMemberDTO.getRole().equalsIgnoreCase("manager")) {
                projectMember.setRole(ProjectMember.Member_role.MANAGER);
            } else if (projectMemberDTO.getRole().equalsIgnoreCase("developer")) {
                projectMember.setRole(ProjectMember.Member_role.DEVELOPER);
            } else if (projectMemberDTO.getRole().equalsIgnoreCase("tester")) {
                projectMember.setRole(ProjectMember.Member_role.TESTER);
            } else if (projectMemberDTO.getRole().equalsIgnoreCase("viewer")) {
                projectMember.setRole(ProjectMember.Member_role.VIEWER);
            } else {
                throw new RuntimeException("Role not found");
            }

            projectMemberRepository.save(projectMember);

            return new ProjectMemberResponse(projectMember.getId(), projectMember.getUser().getId(), projectMember.getProject().getName(), projectMember.getUser().getEmail(), projectMember.getRole().name(), projectMember.getJoined_at());
        } else {
            throw new RuntimeException("Group not exists, forbidden to add new member");
        }
    }

    public void exitProject(ProjectMemberDTO projectMemberDTO) {
        User user = getUser();
        Optional<ProjectMember> optionalProjectMember = projectMemberRepository.findByUserIdAndProjectId(user.getId(), projectMemberDTO.getProjectId());

        if (optionalProjectMember.isPresent()) {
            ProjectMember projectMember = optionalProjectMember.get();
            List<ProjectMember> managerMembers = projectMemberRepository.findByProjectId(projectMemberDTO.getProjectId()).stream().filter(member -> member.getRole().equals(ProjectMember.Member_role.MANAGER)).toList();

            if (managerMembers.size() == 1 && projectMember.getRole().equals(ProjectMember.Member_role.MANAGER)) {
                throw new RuntimeException("You are the only manager in this group, you cannot exit the group");
            }

            projectMemberRepository.delete(projectMember);
        } else {
            throw new RuntimeException("Project not exists, cannot exit group");
        }
    }

}

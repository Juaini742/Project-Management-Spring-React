package com.core.backend.project_member;

import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.helper.ProjectMemberSearchSpecification;
import com.core.backend.project.Project;
import com.core.backend.project.ProjectRepository;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    public ProjectMemberResponse<?> getAllProjectMember(
            String projectId,
            String email,
            String name,
            String role,
            Pageable pageable
    ) {

        ProjectMemberSearchSpecification projectMemberSearchSpecification = new ProjectMemberSearchSpecification();

        Specification<ProjectMember> spec = Specification
                .where(projectMemberSearchSpecification.hasProjectId(projectId));

        if (name != null && !name.isEmpty()) {
            spec = spec.and(projectMemberSearchSpecification.hasName(name));
        }

        if (email != null && !email.isEmpty()) {
            spec = spec.and(projectMemberSearchSpecification.hasEmail(email));
        }

        if (role != null && !role.isEmpty()) {
            spec = spec.and(projectMemberSearchSpecification.hasRole(role));
        }

        org.springframework.data.domain.Page<ProjectMember> pageResult = projectMemberRepository
                .findAll(spec, pageable);

        List<ProjectMemberResponse.MemberData> members = pageResult.getContent().stream()
                .map(projectMember -> new ProjectMemberResponse.MemberData(
                        projectMember.getId(),
                        projectMember.getUser().getId(),
                        projectMember.getProject().getName(),
                        projectMember.getUser().getEmail(),
                        projectMember.getUser().getProfile().getFull_name(),
                        projectMember.getRole().name(),
                        projectMember.getJoined_at()
                ))
                .toList();

        ProjectMemberResponse.Pagination pagination = new ProjectMemberResponse.Pagination(
                pageResult.getNumber(),
                pageResult.getTotalPages(),
                pageResult.getTotalElements()
        );

        return new ProjectMemberResponse<>(members, pagination);

    }

    private User getUser() {
        String email = auhService.getEmailToken();
        return authRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }


    public ProjectMemberResponse<?> addProjectMember(ProjectMemberDTO projectMemberDTO) {
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

            User member = authRepository.findById(projectMemberDTO.getMemberId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            Project project = projectRepository.findById(projectMemberDTO.getProjectId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));

            ProjectMember projectMember = ProjectMember.builder()
                    .project(project)
                    .user(member)
                    .role(extractRole(projectMemberDTO.getRole()))
                    .joined_at(Timestamp.valueOf(LocalDateTime.now()))
                    .build();

            projectMemberRepository.save(projectMember);
            return new ProjectMemberResponse<>(new ProjectMemberResponse.MemberData(
                    projectMember.getId(),
                    projectMember.getUser().getId(),
                    projectMember.getProject().getName(),
                    projectMember.getUser().getEmail(),
                    projectMember.getUser().getProfile().getFull_name(),
                    projectMember.getRole().name(),
                    projectMember.getJoined_at()
            ), null);
        } else {
            throw new RuntimeException("Group not exists, forbidden to add new member");
        }
    }

    public void deleteMember(String id, String projectId) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("Member ID cannot be null or empty");
        }
        if (projectId == null || projectId.isEmpty()) {
            throw new IllegalArgumentException("Project ID cannot be null or empty");
        }

        ProjectMember pm = projectMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        if (!pm.getProject().getId().equals(projectId)) {
            throw new SecurityException("You are not authorized to delete this member");
        }

        List<ProjectMember> managerMembers = projectMemberRepository.findByProjectId(projectId)
                .stream()
                .filter(member -> member.getRole().equals(ProjectMember.Member_role.MANAGER))
                .toList();

        if (managerMembers.size() == 1 && pm.getRole().equals(ProjectMember.Member_role.MANAGER)) {
            throw new RuntimeException("You are the only manager in this group, you cannot exit the group");
        }

        projectMemberRepository.delete(pm);
    }

    public ProjectMemberResponse<ProjectMemberResponse.MemberData> updateMemberStatus(String id, ProjectMemberDTO projectMemberDTO) {
        ProjectMember pm = projectMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        pm.setRole(extractRole(projectMemberDTO.getRole()));
        projectMemberRepository.save(pm);

        ProjectMemberResponse.MemberData memberData = new ProjectMemberResponse.MemberData(
                pm.getId(),
                pm.getUser().getId(),
                pm.getProject().getName(),
                pm.getUser().getEmail(),
                pm.getUser().getProfile().getFull_name(),
                pm.getRole().name(),
                pm.getJoined_at()
        );

        return new ProjectMemberResponse<>(memberData, null);
    }

    private ProjectMember.Member_role extractRole(String role) {
        return switch (role.toUpperCase()) {
            case "MANAGER" -> ProjectMember.Member_role.MANAGER;
            case "DEVELOPER" -> ProjectMember.Member_role.DEVELOPER;
            case "TESTER" -> ProjectMember.Member_role.TESTER;
            case "VIEWER" -> ProjectMember.Member_role.VIEWER;
            default -> throw new RuntimeException("Invalid role");
        };
    }
}

package com.core.backend.helper;

import com.core.backend.project_member.ProjectMember;
import org.springframework.data.jpa.domain.Specification;

public class ProjectMemberSearchSpecification {

    public Specification<ProjectMember> hasProjectId(String projectId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("project").get("id"), projectId);
    }

    public Specification<ProjectMember> hasName(String name) {
        String nameLower = name.toLowerCase();
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(
                root.get("user").get("profile").get("full_name")), "%" + nameLower + "%");
    }

    public Specification<ProjectMember> hasEmail(String email) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                root.get("user").get("email"), "%" + email + "%");
    }

    public Specification<ProjectMember> hasRole(String role) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(
                root.get("role"), "%" + ProjectMember.Member_role.fromString(role) + "%");
    }
}

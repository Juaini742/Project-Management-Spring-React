package com.core.backend.project_member;


import com.core.backend.project.Project;
import com.core.backend.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "project_members")
public class ProjectMember {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Enumerated(EnumType.STRING)
    private Member_role role;

    private Timestamp joined_at;

    public enum Member_role {
        MANAGER, DEVELOPER, TESTER, VIEWER;

        public static Member_role fromString(String role) {
            for (Member_role memberRole : Member_role.values()) {
                if (memberRole.name().equalsIgnoreCase(role)) {
                    return memberRole;
                }
            }
            throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}

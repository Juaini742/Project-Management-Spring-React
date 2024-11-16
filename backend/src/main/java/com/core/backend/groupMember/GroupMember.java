package com.core.backend.groupMember;


import com.core.backend.group.Groups;
import com.core.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "group_members")
public class GroupMember {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    @JsonIgnore
    private Groups group;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_member")
    private RoleGroup roleGroup;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_member")
    private StatusGroup statusGroup;

    private Timestamp joined_at = Timestamp.valueOf(java.time.LocalDateTime.now());

    public enum RoleGroup {
        ADMIN,
        MEMBER
    }

    public enum StatusGroup {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}

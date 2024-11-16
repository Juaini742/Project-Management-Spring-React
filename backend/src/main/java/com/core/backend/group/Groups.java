package com.core.backend.group;


import com.core.backend.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Groups {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String group_name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    @JsonBackReference
    private User user;

    private Timestamp created_at = Timestamp.valueOf(java.time.LocalDateTime.now());
    private Timestamp updated_at = Timestamp.valueOf(java.time.LocalDateTime.now());
}

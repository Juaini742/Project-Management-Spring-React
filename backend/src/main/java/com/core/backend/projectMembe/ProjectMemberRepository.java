package com.core.backend.projectMembe;

import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onDelete;
import com.core.backend.project.Project;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, String> {

    @Query("SELECT pm FROM ProjectMember pm WHERE pm.user.id = :userId AND pm.project.id = :projectId")
    Optional<ProjectMember> findByUserIdAndProjectId(String userId, @NotBlank(message = "field is required") String projectId);

    Optional<List<ProjectMember>> findByUserId(@NotBlank(message = "field is required") String memberId);

    @Query("SELECT pm FROM ProjectMember pm WHERE pm.project.created_by.id = :created_by")
    List<ProjectMember> findAllByProjectCreatedBy(String created_by);

    List<ProjectMember> findByProjectId(@NotBlank(message = "field is required", groups = {onCreate.class, onDelete.class}) String projectId);
}

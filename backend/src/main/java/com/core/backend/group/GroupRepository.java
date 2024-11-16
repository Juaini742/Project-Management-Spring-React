package com.core.backend.group;


import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Groups, String> {
    List<Groups> findAllByUserId(String id);

    Optional<Groups> findByUserId(@NotBlank(message = "field is required") String adminId);
}

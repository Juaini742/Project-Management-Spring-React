package com.core.backend.task;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.helper.TimeConversion;
import com.core.backend.project.Project;
import com.core.backend.project.ProjectRepository;
import com.core.backend.projectMembe.ProjectMember;
import com.core.backend.projectMembe.ProjectMemberRepository;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;

    private User getUser() {
        String email = authService.getEmailToken();
        return authRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public TaskResponse getAllTaskByProject(String projectId) {
        List<Task> tasks = taskRepository.findAllByProjectId(projectId);

        if (tasks.isEmpty()) {
            return new TaskResponse(
                    null,
                    null,
                    List.of()
            );
        }

        List<TaskResponse.TaskDetails> taskDetailsList = tasks.stream()
                .map(data -> new TaskResponse.TaskDetails(
                        data.getId(),
                        data.getName(),
                        data.getDescription(),
                        data.getStatus().name(),
                        data.getPriority().name(),
                        data.getAssignedTo().getEmail(),
                        data.getDeadline())).toList();

        return new TaskResponse(
                tasks.get(0).getProject().getId(),
                tasks.get(0).getProject().getName(),
                taskDetailsList
        );
    }

    public TaskResponse getAllTaskByUserId(String userId) {
        List<Task> tasks = taskRepository.findAllByAssignedTo(userId);

        if (tasks.isEmpty()) {
            throw new RuntimeException("No task found");
        }

        return new TaskResponse(
                tasks.get(0).getAssignedTo().getId(),
                tasks.get(0).getAssignedTo().getEmail(),
                tasks.stream().map(data ->
                        new TaskResponse.TaskDetails(
                                data.getId(),
                                data.getName(),
                                data.getDescription(),
                                data.getStatus().name(),
                                data.getPriority().name(),
                                null,
                                data.getDeadline())).toList()
        );
    }

    public void createTask(TaskDTO taskDTO) {
        User user = getUser();

        Project project = projectRepository.findById(taskDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectMember pm = projectMemberRepository.findByUserIdAndProjectId(user.getId(), taskDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        User assigned = verifyRole(taskDTO, pm);

        Task task = Task.builder()
                .name(taskDTO.getName())
                .description(taskDTO.getDescription())
                .assignedTo(assigned)
                .project(project)
                .deadline(TimeConversion.parseToTimestamp(taskDTO.getDeadline()))
                .created_at(Timestamp.valueOf(LocalDateTime.now()))
                .updated_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();

        switch (taskDTO.getStatus().toUpperCase()) {
            case "DONE" -> task.setStatus(Task.TaskStatus.DONE);
            case "IN_PROGRESS" -> task.setStatus(Task.TaskStatus.IN_PROGRESS);
            case "TODO" -> task.setStatus(Task.TaskStatus.TODO);
            default -> throw new RuntimeException("Invalid status");
        }

        switch (taskDTO.getPriority().toUpperCase()) {
            case "LOW" -> task.setPriority(Task.TaskPriority.LOW);
            case "MEDIUM" -> task.setPriority(Task.TaskPriority.MEDIUM);
            case "HIGH" -> task.setPriority(Task.TaskPriority.HIGH);
            default -> throw new RuntimeException("Invalid priority");
        }
        taskRepository.save(task);
    }

    private User verifyRole(TaskDTO taskDTO, ProjectMember pm) {
        if (!pm.getRole().equals(ProjectMember.Member_role.MANAGER)) {
            throw new RuntimeException("You are not manager, you cannot add new task");
        }
        User assigned = authRepository.findById(taskDTO.getAssignedTo())
                .orElseThrow(() -> new RuntimeException("User not found"));

        projectMemberRepository.findByUserIdAndProjectId(assigned.getId(), taskDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Assigned user is not part of the project"));

        return assigned;
    }

    public void updateTask(String taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        User user = getUser();

        projectRepository.findById(task.getProject().getId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectMember pm = projectMemberRepository.findByUserIdAndProjectId(user.getId(), task.getProject().getId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        verifyRole(taskDTO, pm);

        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setDeadline(TimeConversion.parseToTimestamp(taskDTO.getDeadline()));
        task.setStatus(Task.TaskStatus.valueOf(taskDTO.getStatus().toUpperCase()));
        task.setPriority(Task.TaskPriority.valueOf(taskDTO.getPriority().toUpperCase()));

        taskRepository.save(task);
    }

    public void deleteTask(String taskId) {
        User user = getUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        ProjectMember pm = projectMemberRepository.findByUserIdAndProjectId(user.getId(), task.getProject().getId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        if (!pm.getRole().equals(ProjectMember.Member_role.MANAGER)) {
            throw new RuntimeException("You are not manager, you cannot add new task");
        }

        taskRepository.delete(task);
    }
}

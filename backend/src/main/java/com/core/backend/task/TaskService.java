package com.core.backend.task;


import com.core.backend.auth.AuthRepository;
import com.core.backend.auth.AuthService;
import com.core.backend.project.Project;
import com.core.backend.project.ProjectRepository;
import com.core.backend.project_member.ProjectMember;
import com.core.backend.project_member.ProjectMemberRepository;
import com.core.backend.task_completion.TaskCompletion;
import com.core.backend.task_completion.TaskCompletionRepository;
import com.core.backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;

@RequiredArgsConstructor
@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final AuthService authService;
    private final AuthRepository authRepository;
    private final ProjectRepository projectRepository;
    private final ProjectMemberRepository projectMemberRepository;
    private final TaskCompletionRepository taskCompletionRepository;

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
                        data.getStartDate(),
                        data.getEndDate(),
                        data.getAssignedUsers().stream().map(user ->
                                new TaskResponse.AssignedToDetails(
                                        user.getUser().getEmail(),
                                        user.isDone()
                                )
                        ).toList()
                )).toList();

        return new TaskResponse(
                tasks.get(0).getProject().getId(),
                tasks.get(0).getProject().getName(),
                taskDetailsList
        );
    }
//    public TaskResponse getAllTaskByUserId(String userId) {
//        List<Task> tasks = taskRepository.findAllByAssignedTo(userId);
//
//        if (tasks.isEmpty()) {
//            throw new RuntimeException("No task found");
//        }
//
//        return new TaskResponse(
//                null,
//                null,
//                tasks.stream().map(data ->
//                        new TaskResponse.TaskDetails(
//                                data.getId(),
//                                data.getName(),
//                                data.getDescription(),
//                                data.getStatus().name(),
//                                data.getPriority().name(),
//                                null)).toList()
//        );
//    }

    public void createTask(TaskDTO taskDTO) {
        User user = getUser();

        Project project = projectRepository.findById(taskDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        projectMemberRepository.findByUserIdAndProjectId(user.getId(), taskDTO.getProjectId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        Task task = Task.builder()
                .name(taskDTO.getName())
                .description(taskDTO.getDescription())
                .project(project)
                .status(extractStatus(taskDTO.getStatus()))
                .priority(extractPriority(taskDTO.getPriority()))
                .startDate(taskDTO.getStartDate())
                .endDate(taskDTO.getEndDate())
                .created_at(Timestamp.valueOf(LocalDateTime.now()))
                .updated_at(Timestamp.valueOf(LocalDateTime.now()))
                .build();
        taskRepository.save(task);

        taskDTO.getAssignedTo().forEach(assignedUser -> {
            User assignedUserObj = authRepository.findByEmail(assignedUser)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            TaskCompletion taskCompletion = new TaskCompletion();
            taskCompletion.setTask(task);
            taskCompletion.setUser(assignedUserObj);
            taskCompletionRepository.save(taskCompletion);
        });

    }

//    public void updateTask(String taskId, TaskDTO taskDTO) {
//        Task task = taskRepository.findById(taskId)
//                .orElseThrow(() -> new RuntimeException("Task not found"));
//
//        User user = getUser();
//
//        projectRepository.findById(task.getProject().getId())
//                .orElseThrow(() -> new RuntimeException("Project not found"));
//
//        ProjectMember pm = projectMemberRepository.findByUserIdAndProjectId(user.getId(), task.getProject().getId())
//                .orElseThrow(() -> new RuntimeException("Unauthorized"));
//
//        verifyRole(taskDTO, pm);
//
//        task.setName(taskDTO.getName());
//        task.setDescription(taskDTO.getDescription());
//        task.setDeadline(TimeConversion.parseToTimestamp(taskDTO.getDeadline()));
//        task.setStatus(extractStatus(taskDTO.getStatus()));
//        task.setPriority(extractPriority(taskDTO.getPriority()));
//        taskRepository.save(task);
//    }

    public void deleteTask(String taskId) {
        User user = getUser();

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        ProjectMember pm = projectMemberRepository.findByUserIdAndProjectId(user.getId(), task.getProject().getId())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        if (!pm.getRole().equals(ProjectMember.Member_role.MANAGER)) {
            throw new RuntimeException("You are not manager, you cannot add new task");
        }

        List<TaskCompletion> taskCompletion = taskCompletionRepository
                .findByUserIdAndTaskId(user.getId(), task.getId());

        if (!taskCompletion.isEmpty()) {
            throw new RuntimeException("You have already completed this task");
        }

        taskCompletionRepository.deleteAll(taskCompletion);
        taskRepository.delete(task);
    }

    private Task.TaskPriority extractPriority(String priority) {
        return switch (priority.toUpperCase()) {
            case "LOW" -> Task.TaskPriority.LOW;
            case "MEDIUM" -> Task.TaskPriority.MEDIUM;
            case "HIGH" -> Task.TaskPriority.HIGH;
            default -> throw new RuntimeException("Invalid priority");
        };
    }

    private Task.TaskStatus extractStatus(String status) {
        return switch (status.toUpperCase()) {
            case "DONE" -> Task.TaskStatus.DONE;
            case "IN_PROGRESS" -> Task.TaskStatus.IN_PROGRESS;
            case "TODO" -> Task.TaskStatus.TODO;
            default -> throw new RuntimeException("Invalid status");
        };
    }

//    private User verifyRole(TaskDTO taskDTO, ProjectMember pm) {
//        if (!pm.getRole().equals(ProjectMember.Member_role.MANAGER)) {
//            throw new RuntimeException("You are not manager, you cannot add new task");
//        }
//        User assigned = authRepository.findById(taskDTO.getAssignedTo())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        projectMemberRepository.findByUserIdAndProjectId(assigned.getId(), taskDTO.getProjectId())
//                .orElseThrow(() -> new RuntimeException("Assigned user is not part of the project"));
//
//        return assigned;
//    }
}

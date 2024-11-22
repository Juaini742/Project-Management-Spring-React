package com.core.backend.task;


import com.core.backend.interfaces.onCreate;
import com.core.backend.interfaces.onUpdate;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/secured/task")
@Validated
public class TaskController {

    private final TaskService taskService;

    @GetMapping("/project/{projectId}")
    public ResponseEntity<TaskResponse> getAllTaskByProjectId(@PathVariable String projectId) {
        return ResponseEntity.ok(taskService.getAllTaskByProject(projectId));
    }

    @GetMapping("/assigned/{userId}")
    public ResponseEntity<TaskResponse> getAllTaskByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(taskService.getAllTaskByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<String> createTask(@Validated @RequestBody TaskDTO taskDTO) {
        taskService.createTask(taskDTO);
        return ResponseEntity.ok("Task created successfully");
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateTask(@PathVariable String taskId, @Validated @RequestBody TaskDTO taskDTO) {
        taskService.updateTask(taskId, taskDTO);
        return ResponseEntity.ok("Task updated successfully");
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable String taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }
}

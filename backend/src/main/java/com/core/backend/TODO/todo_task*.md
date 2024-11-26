# Task Entity
- **Attributes**:
  - id, name, description, status, priority, deadline, completion (is_done, completed_at, is_late), review (status, comments, reviewed_at), history (action, user, timestamp), files (id, name, uploaded_by, uploaded_at).
- **Relationships**:
  - One-to-many: Checklist, History, Review, Files
  - Many-to-many: User (via TaskAssignees)

# Checklist Entity
- **Attributes**:
  - id, name, is_done, completed_at.
- **Relationships**:
  - Many-to-one: Task (via task_id)

# History Entity
- **Attributes**:
  - id, action, user, timestamp.
- **Relationships**:
  - Many-to-one: Task (via task_id)

# Review Entity
- **Attributes**:
  - id, status, comments, reviewed_at.
- **Relationships**:
  - One-to-one: Task (via task_id)

# File Entity
- **Attributes**:
  - id, name, uploaded_by, uploaded_at.
- **Relationships**:
  - Many-to-one: Task (via task_id)

# TaskAssignees Entity
- **Attributes**:
  - task_id, user_id.
- **Relationships**:
  - Many-to-one: Task (via task_id)
  - Many-to-one: User (via user_id)

# User Entity
- **Attributes**:
  - id, name, email, role.
- **Relationships**:
  - Many-to-many: Task (via TaskAssignees)

# DTO (Data Transfer Object)
- **TaskDTO**:
  - Attributes: id, name, description, status, priority, deadline, assignees[], checklist[], history[], review, files[]
- **ChecklistDTO**:
  - Attributes: id, name, is_done, completed_at
- **HistoryDTO**:
  - Attributes: action, user, timestamp
- **ReviewDTO**:
  - Attributes: status, comments, reviewed_at
- **FileDTO**:
  - Attributes: id, name, uploaded_by, uploaded_at
- **UserDTO**:
  - Attributes: id, name, email, role

# Repositories
- **TaskRepository**: Handle CRUD operations for Task.
- **UserRepository**: Handle CRUD operations for User.
- **ChecklistRepository**: Handle CRUD operations for Checklist.
- **HistoryRepository**: Handle CRUD operations for History.
- **ReviewRepository**: Handle CRUD operations for Review.
- **FileRepository**: Handle CRUD operations for Files.
- **TaskAssigneeRepository**: Handle many-to-many relationship between Task and User.

# Services
- **TaskService**:
  - `createTask()`: Handle creation of a new task.
  - `addAssigneesToTask()`: Add assignees to a task.
  - `addChecklistToTask()`: Add checklist items to a task.
  - `addHistoryToTask()`: Add activity log/history to a task.
  - `addReviewToTask()`: Add review details to a task.
  - `uploadFileToTask()`: Upload and associate files to a task.
  - `updateTask()`: Update existing task details.
  - `completeTask()`: Mark task as completed and update related attributes.

- **UserService**:
  - `createUser()`: Handle creation of a new user.
  - `getUserDetails()`: Get user details by ID.
  - `updateUser()`: Update user information.
  - `assignTasksToUser()`: Assign tasks to a user (via TaskAssignees).

- **ChecklistService**:
  - `addChecklistToTask()`: Add a checklist to a task.
  - `updateChecklist()`: Update checklist item status (mark as done, add completion time).

- **HistoryService**:
  - `addHistoryToTask()`: Add history to task (record actions, updates, etc.).

- **ReviewService**:
  - `addReviewToTask()`: Add review to task.

# Controllers
- **TaskController**:
  - `POST /api/secured/task`: Endpoint to create a new task.
    - **Request Body**: TaskDTO
    - **Response**: Created Task
  - `GET /api/secured/task/{taskId}`: Endpoint to fetch task details by task ID.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Response**: TaskDTO
  - `PUT /api/secured/task/{taskId}`: Endpoint to update task details.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: TaskDTO
    - **Response**: Updated Task
  - `POST /api/secured/task/{taskId}/assignees`: Endpoint to add assignees to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: List of UserDTOs
    - **Response**: Updated Task with Assignees
  - `POST /api/secured/task/{taskId}/checklist`: Endpoint to add checklist items to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: ChecklistDTO
    - **Response**: Updated Task with Checklist
  - `POST /api/secured/task/{taskId}/history`: Endpoint to add activity logs to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: HistoryDTO
    - **Response**: Updated Task with History
  - `POST /api/secured/task/{taskId}/review`: Endpoint to add review to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: ReviewDTO
    - **Response**: Updated Task with Review
  - `POST /api/secured/task/{taskId}/files`: Endpoint to upload files for a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: FileDTO
    - **Response**: Updated Task with Files

- **UserController**:
  - `POST /api/secured/user`: Endpoint to create a new user.
    - **Request Body**: UserDTO
    - **Response**: Created User
  - `GET /api/secured/user/{userId}`: Endpoint to get user details by ID.
    - **Path Parameter**: `userId` (The ID of the user)
    - **Response**: UserDTO
  - `PUT /api/secured/user/{userId}`: Endpoint to update user details.
    - **Path Parameter**: `userId` (The ID of the user)
    - **Request Body**: UserDTO
    - **Response**: Updated User
  - `POST /api/secured/user/{userId}/tasks`: Endpoint to assign tasks to a user.
    - **Path Parameter**: `userId` (The ID of the user)
    - **Request Body**: List of TaskDTOs
    - **Response**: Updated User with Assigned Tasks

- **ChecklistController**:
  - `POST /api/secured/task/{taskId}/checklist`: Endpoint to add a checklist to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: ChecklistDTO
    - **Response**: Updated Task with Checklist
  - `PUT /api/secured/checklist/{checklistId}`: Endpoint to update checklist item status.
    - **Path Parameter**: `checklistId` (The ID of the checklist item)
    - **Request Body**: ChecklistDTO
    - **Response**: Updated Checklist Item

- **HistoryController**:
  - `POST /api/secured/task/{taskId}/history`: Endpoint to add history to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: HistoryDTO
    - **Response**: Updated Task with History

- **ReviewController**:
  - `POST /api/secured/task/{taskId}/review`: Endpoint to add a review to a task.
    - **Path Parameter**: `taskId` (The ID of the task)
    - **Request Body**: ReviewDTO
    - **Response**: Updated Task with Review

# Project Management Tool

The **Project Management Tool** is a web-based application designed to help teams manage their projects more effectively. With features such as task management, progress tracking, and team collaboration, this application serves as an all-in-one solution for project management needs.

---

## 🌟 Features

- **Project Management**  
  Create, edit, and delete projects with ease.

- **Task Management**  
  Add, update, or delete tasks related to a specific project.

- **Progress Tracking**  
  Monitor project progress in real-time.

- **Team Collaboration**  
  Invite team members to collaborate on projects.

- **Interactive Dashboard**  
  Display project statistics and metrics through visualizations.

- **Group Chat For each project**  
  Chat with team members within the project.

---

## 🛠️ Technologies Used

### Backend:
- **Spring Boot**: A Java framework for building RESTful APIs.
- **Spring Security**: For authentication and authorization.
- **Hibernate**: ORM for database management.
- **PostgreSQL**: Database to store application data.
- **Lombok**: For reducing boilerplate code.
- **Validation**: For validating user input.

### Frontend:
- **React(Vite)**: A JavaScript library for building user interfaces.
- **React Router**: For page navigation.
- **Axios**: For communication between frontend and backend.
- **Shadcn**: For UI components.

### Others:
- **JWT**: For authentication token management.
- **Tailwind CSS**: For styling.

---

## 📂 Project Structure

```
project-management-tool/
├── backend/
│   ├── src/main/java/com/backend/**
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites:
- **Java 17** or later.
- **Node.js** and **npm**.
- **PostgreSQL**.

### Steps:

1. **Clone the Repository**
   ```bash
   https://github.com/Juaini742/Project-Management-Spring-React.git
   cd project-management-tool
   ```

2. **Setup Backend**
    - Navigate to the `backend` folder.
    - Configure the `application.properties` file for database connection:
      ```properties
      spring.datasource.url=jdbc:postgresql://localhost:5432//project_management_tool
      spring.datasource.username=root
      spring.datasource.password=yourpassword
      ```
    - Start the backend:
      ```bash
      ./mvnw spring-boot:run
      ```

3. **Setup Frontend**
    - Navigate to the `frontend` folder.
    - Install dependencies:
      ```bash
      npm install
      ```
    - Start the frontend:
      ```bash
      npm run dev
      ```

4. **Access the Application**
    - Backend API: [http://localhost:8080](http://localhost:8080)
    - Frontend: [http://localhost:5173](http://localhost:5173)

---

## 🛡️ Security

This application uses:
- **JWT** for authentication.
- **Spring Security** for API protection.
- **HTTPS** *(recommended for production)*.

---

## 📖 API Documentation

Complete API documentation is available at `/swagger-ui.html` (automatically enabled if using SpringFox Swagger).

---

## 💻 Contribution

We welcome contributions from everyone! Follow these steps to contribute:

1. Fork this repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Commit your changes: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Create a pull request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🧑‍💻 Developers

- **Juaini**  
  *Your Role (e.g., Backend Developer, Fullstack Developer, etc.)*  
  [LinkedIn](https://www.linkedin.com/in/juaini-i/) | [GitHub](https://github.com/Juaini742) | [Email](mailto:juaini742@gmail.com)

---

With this README, you now have a strong starting point for documenting your project. Feel free to add more details or features as needed! 😊
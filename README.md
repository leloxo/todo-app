# Todo App

A full-stack Todo Application built with a Java/Spring Boot backend and a React/TypeScript frontend. The app uses MySQL for the database, and Redux for state management on the frontend.

## Technologies

### Backend
- **Java**
- **Spring Boot**
- **MySQL**
- **JPA/Hibernate**
- **Maven**

### Frontend
- **React** with **TypeScript**
- **Redux** for state management
- **Axios** for API calls
- **CSS Modules**

## Screenshot

![Todo App Screenshot](/todo-app-frontend/src/assets/screenshots/todo-app-screenshot.png)

## Getting Started

To run this project locally, you'll need to set up both the backend and the frontend. Follow the steps below for each part.

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/leloxo/todo-app.git
    cd todo-app/todo-app-backend
    ```

2. Set up MySQL Database:
    - Create a new MySQL database.
    - Update the database connection settings in `src/main/resources/application.properties`.

3. Build and run the backend:
    ```bash
    ./mvnw clean install
    ./mvnw spring-boot:run
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd ../todo-app-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

## Usage

Once both the frontend and backend are running:

- Visit `http://localhost:3000` to use the Todo App.
- The frontend will make API calls to the backend at `http://localhost:8080`.

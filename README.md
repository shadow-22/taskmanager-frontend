# Task Manager - Frontend

This is the frontend part of the **Task Manager** app, built using **React**. The frontend interacts with a Django backend API to manage tasks.

## Features

- Task management (create, update, delete, and list tasks).
- Pagination support for loading tasks in chunks.
- Filtering tasks by completion status.
- Styled using **Bootstrap**.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

1. **Clone the repository:**

    ```bash
    mkdir frontend
    cd frontend
    git clone https://github.com/shadow-22/taskmanager-frontend.git
    cd taskmanager-frontend

2. **Install dependencies:**
    
    ```bash
    npm install

3. **Start the development server:**
    
    ```bash
    npm start

The app will be running at http://localhost:3000

4. **API Backend:**

    Make sure the Django backend is running locally on http://127.0.0.1:8000 or update the "proxy" value in the package.json file accordingly if your backend is hosted elsewhere.


# Tech-Cart — Full Stack E‑Commerce Platform

Tech-Cart is a **full‑stack e‑commerce application** built to demonstrate a real‑world production‑style architecture using **React (Frontend)**, **Node.js & Express (Backend)**, **MongoDB (Database)**, and **Docker / Docker Compose**.

The goal of this project is to show how a modern e‑commerce platform can be developed, containerized, and run locally with a **single command**.

<img width="1920" height="911" alt="Tech-Cart-01-15-2026_11_51_AM" src="https://github.com/user-attachments/assets/c6e5b952-ca3e-480d-8813-4793fcccd771" />
<img width="1920" height="911" alt="Tech-Cart-01-15-2026_11_51_AM (1)" src="https://github.com/user-attachments/assets/00d6b971-deaf-4039-932e-a94b5847fdc1" />



---

## 📂 Project Structure

```
tech-cart/
│
├── frontend/              # React frontend
├── backend/               # Node.js backend
├── docker-compose.yml     # Multi-container setup
├── .env                   # Environment variables (not committed)
├── .dockerignore
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed on your system:

* **Docker**
* **Docker Compose**
* **Git**

Check installation:

```bash
docker --version
docker-compose --version
```

---

## 🔐 Environment Variables Setup

Create a `.env` file in the **project root** directory.

```
PORT=8082
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/techcart
JWT_SECRET=your_jwt_secret
```

---

# 1. Simple setup and run locally

1. Clone the repo..
~~~
git clone repo_name
~~~
2. Go to the backed folder
~~~
cd backend
~~~

3. Installation
~~~
npm instaLL
~~~

# 2. Running via docker-compose 

This project uses **Docker Compose**, so you do NOT need to run containers manually.

### 1️⃣ Build & Start all services

```bash
docker-compose up -d
```

This single command will:

* Create a Docker network
* Start frontend, backend, and database containers
* Inject environment variables
* Run everything in the correct order

---

### 2️⃣ Check running containers

```bash
docker-compose ps
```

---

### 3️⃣ Access the application

| Service     | URL                                            |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:5173](http://localhost:5173) |
| Backend API | [http://localhost:8082](http://localhost:8082) |

---

### 4️⃣ View logs (optional)

```bash
docker-compose logs -f
```

For a specific service:

```bash
docker-compose logs backend
```

---

## 🛑 Stopping the Application

```bash
docker-compose down
```

To remove volumes as well:

```bash
docker-compose down -v
```

---

## Architecture Overview

```
Browser
  ↓
Frontend (React)
  ↓
Backend (Node.js + Express)
  ↓
MongoDB (Atlas / Local)
```

All services communicate internally using a **Docker network**.

---

## ✅ Best Practices Followed

* Environment variables managed via `.env`
* Dockerized frontend & backend
* Docker Compose for multi‑container orchestration
* No secrets committed to repository
* Production‑style folder structure

---

---

## ⭐ Support

If you found this project helpful:

* Give it a ⭐ on GitHub
* Share feedback or suggestions

---

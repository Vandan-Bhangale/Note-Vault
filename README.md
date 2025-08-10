# Note Vault – MERN App (Vite + Express + Render Deployment)

A full-stack note-taking application with a **Vite + React** frontend and a **Node.js + Express + MongoDB** backend, deployed on **Render**.

---

## 🚀 Features
- User authentication (Register / Login)
- Create, read, update and delete notes
- Persistent storage with MongoDB Atlas
- Backend API connected to frontend (CORS-enabled)

---

## 📂 Project Structure

```
project/
│
├── client/ # Vite + React frontend
│ ├── src/
│ ├── index.html
│ ├── package.json
│
├── server/ # Node.js + Express backend
│ ├── models/
│ ├── routes/
│ ├── index.js
│ ├── package.json
│
└── README.md
```
## 🌐 Live Links
- **Frontend:** https://note-vault-frontend.onrender.com
- **Backend API:** https://note-vault-1-z260.onrender.com

---

## 📖 How to Use
1. Open the (https://note-vault-frontend-936q.onrender.com/).
2. Register a new account.
3. Log in using your credentials.
4. Start creating and managing your notes.

---

## 🛠 Tech Stack
**Frontend:** React (Vite)  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas  
**Hosting:** Render

---

## 📌 API Endpoints
**Base URL:** `https://note-vault-1-z260.onrender.com/api`

| Method | Endpoint          | Description              |
|--------|------------------|--------------------------|
| POST   | /register        | Create a new user        |
| POST   | /login           | Authenticate a user      |
| POST   | /createNote      | Add a new note           |
| GET    | /notes           | Get all notes            |
| PUT    | /notes/:id       | Update a note            |
| DELETE | /notes/:id       | Delete a note            |

---

## 📜 License
This project is open-source and free to use.



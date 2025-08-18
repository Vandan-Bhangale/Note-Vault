# Note Vault

A **full-stack note-taking web application** built with the **MERN stack (MongoDB, Express, React, Node.js)**.  
Users can **create, edit, delete, and organize notes** with secure login functionality.

---

## Features

- User authentication (signup/login/logout)
- Create, edit, and delete notes
- Store notes in MongoDB database
- Responsive and intuitive React frontend
- User-specific notes with session management

---

## Tech Stack

- **Frontend:** React, Vite, Axios, Bootstrap CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** Express-session, cookies

---

## Folder Structure

note-vault/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── .env
│ ├── server.js
├── frontend/
│ ├── src/
│ ├── .env
│ ├── package.json
├── README.md

---

## Getting Started
To see the live demo click here👇
(https://note-vault-frontend-bay.vercel.app/)

### Clone the repository

```bash
git clone https://github.com/Vandan-Bhangale/Note-Vault.git
cd note-vault

Backend setup

Edit
cd backend
npm install
Create a .env file:

env

PORT=3000
MONGODB_URI=<Your MongoDB URI>
SESSION_SECRET=<Your Secret Key>
CORS_ORIGIN=http://localhost:5173
Start the backend: npm start (If you have nodemon)

Frontend setup

Edit
cd frontend
npm install
Create a .env file:

env
Copy
Edit

VITE_LOGIN_API=http://localhost:3000
Start the frontend: npm run dev

Usage:-

Open the frontend in your browser
Signup or login
Create, edit, or delete your notes
Logout when finished


Environment Variables
Backend (backend/.env)
env (Copy,Edit)
PORT=3000
MONGODB_URI=<Your MongoDB URI>
SESSION_SECRET=<Your Secret Key>
CORS_ORIGIN=<Frontend URL>

Frontend (frontend/.env)
env (Copy,Edit)
VITE_LOGIN_API=<Backend URL>


License
This project is open source and free to use, modify, and share.

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateNoteForm from './components/CreateNote';
import Notes from './components/Notes';
import Home from './components/Home';
import EditNote from './components/EditNote';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_GENERAL_API}/api/status`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user || null);
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/createNote" element={<CreateNoteForm />} />
        <Route path="/notes" element={<Notes searchTerm={searchTerm} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  )
}

export default App

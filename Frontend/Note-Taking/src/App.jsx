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

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/edit/:id" element={<EditNote />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/createNote" element={<CreateNoteForm />} />
        <Route path="/notes" element={<Notes searchTerm={searchTerm}/>} />
      </Routes>
    </Router>
  )
}

export default App

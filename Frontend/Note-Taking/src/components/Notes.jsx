import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Notes = ({ searchTerm }) => {
  const [notes, setNotes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginCookie = Cookies.get("isLoggedIn");
    setIsLoggedIn(loginCookie === "true");
  }, []);

  //Fetching the notes from the database
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data); // Set the notes from database
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  //Deleting the note
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/delete/${id}`
      );
      toast.success("Note deleted successfully!");
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      toast.error("Failed to delete note. Please try again.");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Add Note Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📝 Your Notes</h2>
        {isLoggedIn && (
          <Link
            to="/createNote"
            className="btn btn-lg px-4 py-2 rounded-pill d-inline-flex align-items-center gap-2 shadow-sm"
            style={{
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              color: "#fff",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            }}
          >
            <i className="bi bi-plus-lg"></i>
            Add Note
          </Link>
        )}
      </div>

      {/* Notes Grid */}
      <div className="row">
        {notes.length === 0 ? (
          <p className="text-muted text-center">
            No notes yet. Click "Add Note" to get started!
          </p>
        ) : (
          notes
            .filter(
              (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
            .map((note) => (
              <div className="col-md-6 col-lg-4 mb-4" key={note._id}>
                <div className="card position-relative shadow-sm border-0 rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="position-absolute top-0 end-0 m-2 d-flex flex-column align-items-end gap-2">
                      <FaEdit
                        className="text-success"
                        style={{ cursor: "pointer", fontSize: "1.3rem" }}
                        onClick={() => navigate(`/edit/${note._id}`)}
                      />
                      <FaTrash
                        className="text-danger"
                        style={{ cursor: "pointer", fontSize: "1.3rem" }}
                        onClick={() => handleDelete(note._id)}
                      />
                    </div>

                    {/* Note Title */}
                    <h5 className="card-title fw-semibold mb-2 text-primary">
                      {note.title}
                    </h5>

                    {/* Note Description */}
                    <p
                      className="card-text text-muted mb-3"
                      style={{
                        fontSize: "0.95rem",
                        whiteSpace: "pre-wrap",
                        maxHeight: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {note.description}
                    </p>

                    {/* Tags */}
                    <div>
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge bg-secondary me-1 mb-1 text-capitalize"
                          style={{ fontSize: "0.8rem" }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Notes;

import { useParams, useNavigate, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const EditNoteForm = () => {
  const { id } = useParams(); // Get note ID from route
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the note by ID
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/note/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch note", err);
        navigate("/"); // Redirect back if failed
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/notes/update/${id}`, {
        title,
        description,
      });
      toast.success("Note updated successfully!");
      navigate("/notes"); // Redirect to notes page after update
    } catch (err) {
      toast.error("Failed to update note. Please try again.");
      console.error("Failed to update note", err);
    }
  };

  if (loading) return <p>Loading note...</p>;

  return (
    <form
      onSubmit={handleUpdate}
      className="container mt-5"
      style={{ maxWidth: "600px" }}
    >
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Edit Note</h2>

          <div className="mb-3">
            <label htmlFor="noteTitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="noteTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="noteDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="noteDescription"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditNoteForm;

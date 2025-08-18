import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const CreateNoteForm = () => {

  const Navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = note.tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

    const formattedNote = {
    ...note,
    tags: tagsArray,
  };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/createNote`,
        formattedNote,{withCredentials: true}
      );
      toast.success("Note created successfully!");
      Navigate("/notes")
    } catch (error) {
      toast.error("Failed to create note. Please try again.");
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create a New Note</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={note.title}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter note title"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={note.description}
                onChange={handleChange}
                required
                rows="4"
                className="form-control"
                placeholder="Write your note here..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="form-label">Tags</label>
              <input
                type="text"
                name="tags"
                value={note.tags}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., work, personal, urgent"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Create Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNoteForm;

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light">
      <h1 className="display-4 fw-bold mb-3">Capture Ideas Instantly.</h1>
      <p className="lead text-muted mb-4">
        Organize, track, and find your notes—
        <br />
        fast and easily.
      </p>
      <div className="d-flex gap-3">
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
          Create Note
        </Link>
        <Link to={"/notes"} className="btn btn-outline-secondary btn-lg">
          <i className="bi bi-folder2-open me-2"></i>View All Notes
        </Link>
      </div>
    </div>
  );
};

export default Home;

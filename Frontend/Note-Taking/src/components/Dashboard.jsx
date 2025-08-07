import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <Link to="/createNote" className="btn btn-primary btn-lg rounded-pill px-4 py-2 shadow-sm d-inline-flex align-items-center">
      <i className="bi bi-plus-lg me-2"></i>
      Add note
    </Link>
  );
};

export default Dashboard;

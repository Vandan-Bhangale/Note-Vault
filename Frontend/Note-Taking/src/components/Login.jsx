import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Cookies from "js-cookie"; // ✅ for reading cookies later (if needed)

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ always prevent default first

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        { email, password },
        { withCredentials: true } // ✅ important to allow cookies
      );

      if (response.data.message === "Login successful") {
        toast.success("Login successful!");

        // ✅ Check if cookie was set (optional)
        const isLoggedIn = Cookies.get("isLoggedIn");  
        console.log("isLoggedIn cookie:", isLoggedIn); // should be "true"

        navigate("/notes");
        window.location.reload();
      } else {
        toast.error("Unexpected login response.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <p className="mt-3">
              Don't have an account? <a href="/Register">Register here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

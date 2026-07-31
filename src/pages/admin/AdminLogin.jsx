import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { FaBriefcase, FaEnvelope, FaLock, FaEye } from "react-icons/fa";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();


    localStorage.setItem("token", "admin-demo-token");
    localStorage.setItem("role", "admin");

    navigate("/admin/dashboard");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}

        <div className="logo">
          <div className="logo-box">
            <FaBriefcase />
          </div>

          <h2>
            RecruitHub<span>💼</span>
          </h2>
        </div>



        <div className="badge">
          🛡 administrator access
        </div>

        <h1>Sign in to the console</h1>

        <p className="subtitle">
          Manage jobs, employees, candidates and
          companies from one dashboard.
        </p>



        <label>Email address</label>

        <div className="input-box">
          <FaEnvelope className="icon"/>
          <input
            type="email"
            placeholder="admin@talentbridge.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <label>Password</label>

        <div className="input-box">
          <FaLock className="icon"/>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FaEye className="eye"/>
        </div>

        <div className="forgot">
          <a href="/">Forgot password?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Log In →
        </button>

        <p className="bottom-text">
          Not an admin?
          <a href="/"> Candidate / Employer Login</a>
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;
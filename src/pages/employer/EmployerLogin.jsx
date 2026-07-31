import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./EmployerLogin.css";
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaEye,
  FaBuilding
} from "react-icons/fa";

function EmployerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: replace with a real call to services/employerService.js
    // e.g. await employerService.login(email, password)
    localStorage.setItem("token", "employer-demo-token");
    localStorage.setItem("role", "employer");

    navigate("/employer/dashboard");
  };

  return (
    <div className="employer-page">

      <div className="employer-card">

        {/* Logo */}

        <div className="logo">
          <div className="logo-icon">
            <FaBriefcase />
          </div>

          <h2>
            RecruitHub<span>💼</span>
          </h2>
        </div>



        <div className="badge">
          <FaBuilding />
          <span>Employer Access</span>
        </div>

        <h1>Sign in to post jobs</h1>

        <p className="subtitle">
          Manage job postings, review candidates,
          schedule interviews and hire top talent.
        </p>


        <label>Company Email</label>

        <div className="input-box">
          <FaEnvelope className="icon"/>

          <input
            type="email"
            placeholder="hr@company.com"
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
          <a href="/">Forgot Password?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Log In →
        </button>

        <p className="register-text">
          Not registered?
          <Link to="/employer/register"> Register Your Company</Link>
        </p>

      </div>

    </div>
  );
}

export default EmployerLogin;
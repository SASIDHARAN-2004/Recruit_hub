import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CandidateLogin.css";
import {
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaEye,
  FaUser
} from "react-icons/fa";

function CandidateLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // TODO: replace with a real call to services/authService.js or
    // services/candidateService.js e.g. await candidateService.login(email, password)
    localStorage.setItem("token", "candidate-demo-token");
    localStorage.setItem("role", "candidate");

    navigate("/candidate/dashboard");
  };

  return (
    <div className="candidate-page">

      <div className="candidate-card">

        {/* Logo */}

        <div className="logo">
          <div className="logo-icon">
            <FaBriefcase />
          </div>

          <h2>
            RecruitHub<span>💼</span>
          </h2>
        </div>

        {/* Badge */}

        <div className="badge">
          <FaUser />
          <span>Candidate Access</span>
        </div>

        <h1>Sign in to find jobs</h1>

        <p className="subtitle">
          Search jobs, apply instantly, track applications,
          and manage your career in one place.
        </p>


        <label>Email Address</label>

        <div className="input-box">
          <FaEnvelope className="icon" />

          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>



        <label>Password</label>

        <div className="input-box">
          <FaLock className="icon" />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <FaEye className="eye" />
        </div>

        <div className="forgot">
          <a href="/">Forgot Password?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Log In →
        </button>

        <p className="register-text">
          New here?
          <Link to="/candidate/register"> Create Candidate Account</Link>
        </p>

      </div>

    </div>
  );
}

export default CandidateLogin;
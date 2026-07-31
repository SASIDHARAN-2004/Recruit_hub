import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CandidateRegister.css";

const CandidateRegister = () => {

  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    fullName: "",
    email: "",
    password: "",
    mobile: "",
    workStatus: "",
    updates: false
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setCandidate({
      ...candidate,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(candidate);

    alert("Candidate Registered Successfully");

    navigate("/candidate/login");

  };

  return (

    <div className="register-container">


      <header className="header">

        <div className="logo">

          <span className="logo-box"></span>

          RecruitHub💼

        </div>

        <div className="login-text">

          Already Registered?
          <Link to="/candidate/login"> Login</Link>

        </div>

      </header>

      <div className="register-wrapper">



        <div className="left-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt=""
          />

          <h2>On registering, you can</h2>

          <ul>

            <li>Build your profile and let recruiters find you</li>

            <li>Receive job updates by email</li>

            <li>Find better career opportunities</li>

          </ul>

        </div>


        <div className="form-card">

          <h1>Create your RecruitHub profile</h1>

          <p>
            Search & Apply to jobs across every recruitment company.
          </p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              onChange={handleChange}
            />

            <label>Email ID</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              onChange={handleChange}
            />

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobile"
              placeholder="+91 Enter Mobile Number"
              onChange={handleChange}
            />

            <label>Work Status</label>

            <div className="status">

              <div
                className={
                  candidate.workStatus === "experienced"
                    ? "status-box active"
                    : "status-box"
                }
                onClick={() =>
                  setCandidate({
                    ...candidate,
                    workStatus: "experienced",
                  })
                }
              >

                <h3>I'm Experienced</h3>

                <p>I have work experience.</p>

              </div>

              <div
                className={
                  candidate.workStatus === "fresher"
                    ? "status-box active"
                    : "status-box"
                }
                onClick={() =>
                  setCandidate({
                    ...candidate,
                    workStatus: "fresher",
                  })
                }
              >

                <h3>I'm a Fresher</h3>

                <p>I am a student or recent graduate.</p>

              </div>

            </div>

            <div className="checkbox">

              <input
                type="checkbox"
                name="updates"
                onChange={handleChange}
              />

              Receive important updates via SMS, Email & WhatsApp

            </div>

            <button>

              Register Now

            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default CandidateRegister;
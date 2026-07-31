import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./EmployerRegister.css";

const CompanyRegister = () => {

  const navigate = useNavigate();

  const [company, setCompany] = useState({
    companyName: "",
    contactPerson: "",
    designation: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    companySize: "",
    updates: false
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setCompany({
      ...company,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(company);

    // TODO: replace with a real call to services/employerService.js
    // e.g. await employerService.register(company)
    alert("Company Registered Successfully");

    navigate("/employer/login");

  };

  return (

    <div className="company-container">

      {/* Header */}

      <header className="header">

        <div className="logo">
          <span className="logo-box"></span>
          RecruitHub 💼
        </div>

        <div className="login">
          Already Registered?
          <Link to="/employer/login"> Login</Link>
        </div>

      </header>

      <div className="company-wrapper">

        {/* Left Card */}

        <div className="left-card">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3050/3050525.png"
            alt=""
          />

          <h2>On registering, you can</h2>

          <ul>

            <li>Post job openings once verified</li>

            <li>Find qualified candidates</li>

            <li>Track applications easily</li>

            <li>Manage all jobs in one dashboard</li>

          </ul>

        </div>

        {/* Right Card */}

        <div className="form-card">

          <h1>Register your Company</h1>

          <p>Get verified and start hiring candidates.</p>

          <div className="info-box">
            Our admin team will verify your company before approving your
            account.
          </div>

          <form onSubmit={handleSubmit}>

            <label>Company Name</label>

            <input
              type="text"
              name="companyName"
              placeholder="Enter Company Name"
              onChange={handleChange}
            />

            <div className="row">

              <div>

                <label>HR / Contact Person</label>

                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Full Name"
                  onChange={handleChange}
                />

              </div>

              <div>

                <label>Designation</label>

                <input
                  type="text"
                  name="designation"
                  placeholder="HR Manager"
                  onChange={handleChange}
                />

              </div>

            </div>

            <label>Company Email</label>

            <input
              type="email"
              name="email"
              placeholder="hr@company.com"
              onChange={handleChange}
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              onChange={handleChange}
            />

            <div className="row">

              <div>

                <label>Contact Number</label>

                <input
                  type="text"
                  name="phone"
                  placeholder="+91 Mobile Number"
                  onChange={handleChange}
                />

              </div>

              <div>

                <label>Website</label>

                <input
                  type="text"
                  name="website"
                  placeholder="www.company.com"
                  onChange={handleChange}
                />

              </div>

            </div>

            <label>Company Size</label>

            <div className="size">

              <div
                className={
                  company.companySize === "1-50"
                    ? "size-box active"
                    : "size-box"
                }
                onClick={() =>
                  setCompany({
                    ...company,
                    companySize: "1-50",
                  })
                }
              >
                <h3>1-50</h3>
                <p>Employees</p>
              </div>

              <div
                className={
                  company.companySize === "51-200"
                    ? "size-box active"
                    : "size-box"
                }
                onClick={() =>
                  setCompany({
                    ...company,
                    companySize: "51-200",
                  })
                }
              >
                <h3>51-200</h3>
                <p>Employees</p>
              </div>

              <div
                className={
                  company.companySize === "200+"
                    ? "size-box active"
                    : "size-box"
                }
                onClick={() =>
                  setCompany({
                    ...company,
                    companySize: "200+",
                  })
                }
              >
                <h3>200+</h3>
                <p>Employees</p>
              </div>

            </div>

            <div className="checkbox">

              <input
                type="checkbox"
                name="updates"
                onChange={handleChange}
              />

              Receive updates through SMS, Email and WhatsApp

            </div>

            <button type="submit">
              Register Company
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default CompanyRegister;
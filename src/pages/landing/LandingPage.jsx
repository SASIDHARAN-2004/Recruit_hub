import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

/**
 * Recruitment Companies Dashboard — Landing Page
 * Stack: React 18 (works with CRA or Vite)
 * Fonts used: Georgia (display/serif) + Segoe UI / system sans (body/UI)
 * Icons: Tabler Icons webfont — add this to index.html <head>:
 *   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css">
 */

const FILTER_CHIPS = [
  { label: "Category: Engineering", tone: "amber" },
  { label: "Skill: React", tone: "teal" },
  { label: "Location: Chennai", tone: "neutral" },
  { label: "3 openings matched", tone: "amber" },
];

const ZONES = [
  {
    title: "Administrator",
    desc: "Creates jobs, companies, categories, employees, and sends bulk mail/SMS to candidates, employees, and recruitment companies.",
    cta: "Explore admin panel",
    to: "/admin/login",
  },
  {
    title: "Candidates",
    desc: "Register, verify by OTP or email, search jobs by company, category, skill, location, salary or experience, and apply in one click.",
    cta: "Browse open roles",
    to: "/candidate/register",
  },
  {
    title: "Employer zone",
    desc: "Companies register, get verified by the admin, then gain access to post job openings and track applicants.",
    cta: "Register your company",
    to: "/employer/register",
  },
];

const STATS = [
  { value: "12,400+", label: "Verified candidates" },
  { value: "860+", label: "Recruitment companies" },
  { value: "3,200+", label: "Live job openings" },
];

const SOCIAL_LINKS = [
  { icon: "ti-brand-facebook", label: "Facebook", href: "#" },
  { icon: "ti-brand-twitter", label: "Twitter", href: "#" },
  { icon: "ti-brand-instagram", label: "Instagram", href: "#" },
  { icon: "ti-brand-linkedin", label: "LinkedIn", href: "#" },
];

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About us", "Careers", "Employer home", "Sitemap", "Credits"],
  },
  {
    title: "Support",
    links: [
      "Help center",
      "Summons/Notices",
      "Grievances",
      "Report issue",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy policy",
      "Terms & conditions",
      "Fraud alert",
      "Trust & safety",
    ],
  },
];

export default function LandingPage() {
  const [chipIndex, setChipIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setChipIndex((i) => (i + 1) % FILTER_CHIPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (to) => {
    navigate(to);
  };

  return (
    <div className="landing-root">
     
       <header className="header">
      <div className="container">

        {/* Logo */}
        <div className="logo">
          RecruitHub
          <span className="logo-icon">💼</span>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="/">Jobs</a>
          <a href="/">Companies</a>
          <a href="/">Categories</a>
        </nav>

        {/* Buttons */}
        <div className="header-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/candidate/login")}
          >
            Login
          </button>

          <button
            className="signup-btn"
            onClick={() => navigate("/candidate/register")}
          >
            Sign In
          </button>
        </div>

      </div>
    </header>


      <header className="hero">
        <p className="eyebrow">Recruitment companies dashboard</p>
        <h1>
          Where companies post roles,
          <br /> and the right people find them.
        </h1>
        <p className="hero-sub">
          One platform for administrators, employers, and candidates —
          job creation, verified employer access, resume matching, and
          mail/SMS alerts, all in one pipeline.
        </p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => handleAction("/candidate/register")}
          >
            Find a job
          </button>
          <button
            className="btn-outline"
            onClick={() => handleAction("/employer/register")}
          >
            Post a job
          </button>
        </div>



        <div className="chip-ticker" aria-hidden="false">
          {FILTER_CHIPS.map((chip, i) => (
            <React.Fragment key={chip.label}>
              <span
                className={`chip chip-${chip.tone} ${
                  i === chipIndex ? "chip-active" : ""
                }`}
              >
                {chip.label}
              </span>
              {i < FILTER_CHIPS.length - 1 && (
                <span className="chip-arrow">&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </header>






      <section className="stats-strip">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>


      <section className="zones-section">
        <p className="eyebrow eyebrow-dark">Three zones, one system</p>
        <div className="zones-grid">
          {ZONES.map((zone) => (
            <div className="zone-card" key={zone.title}>
              <i
                className={`ti ${zone.icon}`}
                style={{ color: zone.color, fontSize: 26 }}
                aria-hidden="true"
              />
              <h3>{zone.title}</h3>
              <p>{zone.desc}</p>
              <button
                className="zone-link"
                onClick={() => handleAction(zone.to)}
              >
                {zone.cta} &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

 
      <footer className="footer-cta">
        <h2>Ready to build your hiring pipeline?</h2>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => navigate("/candidate/register")}
          >
            Create free account
          </button>
          <button
            className="btn-outline-dark"
            onClick={() => navigate("/admin/login")}
          >
            Talk to admin team
          </button>
        </div>
      </footer>


      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo">
              HireGrid<span className="brand-dot">.</span>
            </div>
            <p className="footer-connect-label">Connect with us</p>
            <div className="footer-socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="footer-social-icon"
                >
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div className="footer-link-col" key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-app-col">
            <p className="footer-col-title">Apply on the go</p>
            <p className="footer-app-sub">
              Get real-time job updates on our app
            </p>
            <div className="footer-app-badges">
              <a href="#" className="footer-app-badge" aria-label="Download on Google Play">
                <i className="ti ti-brand-google-play" aria-hidden="true" />
                Google Play
              </a>
              <a href="#" className="footer-app-badge" aria-label="Download on the App Store">
                <i className="ti ti-brand-apple" aria-hidden="true" />
                App Store
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-legal-line">
            All trademarks are the property of their respective owners
          </p>
          <p className="footer-legal-line">
            All rights reserved 2026 Info Edge (India) Ltd.
          </p>
        </div>
      </footer>
    </div>
  );
}
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  Building2,
  PlusCircle,
  ListChecks,
  Users2,
  LogOut,
  Mail,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  MapPin,
  Tag,
  Layers,
  Wrench,
  IndianRupee,
  GraduationCap,
  FileText,
  Lock,
} from "lucide-react";
import "./EmployerDashboard.css";

const CATEGORY_OPTIONS = ["Engineering", "Human Resources", "Analytics", "Design", "Sales", "Operations"];
const LOCATION_OPTIONS = ["Chennai", "Bengaluru", "Hyderabad", "Mumbai", "Remote"];
const QUALIFICATION_OPTIONS = ["Any Degree", "B.E / B.Tech", "B.Sc / B.Tech", "MBA", "M.E / M.Tech"];
const EXPERIENCE_OPTIONS = ["0-2 yrs", "1-3 yrs", "2-4 yrs", "4-6 yrs", "5-8 yrs", "8+ yrs"];

const INITIAL_COMPANY = {
  name: "Zenith Softech",
  email: "hr@zenithsoftech.com",
  phone: "+91 98765 12340",
  industry: "Information Technology",
  website: "www.zenithsoftech.com",
  address: "Guindy, Chennai, Tamil Nadu",
  status: "pending", 
  registeredOn: "18 Jul 2026",
  verificationNote: "",
};

const INITIAL_JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    category: "Engineering",
    location: "Chennai",
    designation: "Senior Developer",
    skills: ["React", "JavaScript", "Redux"],
    salaryMin: 12,
    salaryMax: 18,
    experience: "4-6 yrs",
    qualification: "B.E / B.Tech",
    openings: 2,
    status: "Open",
    adminVisibility: "Visible to admin",
    postedOn: "19 Jul 2026",
  },
  {
    id: 2,
    title: "Junior Java Developer",
    category: "Engineering",
    location: "Chennai",
    designation: "Junior Developer",
    skills: ["Java", "Spring Boot", "MySQL"],
    salaryMin: 4,
    salaryMax: 7,
    experience: "0-2 yrs",
    qualification: "B.E / B.Tech",
    openings: 3,
    status: "Open",
    adminVisibility: "Visible to admin",
    postedOn: "20 Jul 2026",
  },
];

const INITIAL_APPLICATIONS = [
  {
    id: 101,
    jobId: 1,
    jobTitle: "Senior React Developer",
    candidateName: "Arun Kumar",
    email: "arun.kumar@example.com",
    phone: "+91 98765 43210",
    experience: "4-6 yrs",
    qualification: "B.E / B.Tech",
    resumeName: "arun_kumar_resume.pdf",
    appliedOn: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: 102,
    jobId: 1,
    jobTitle: "Senior React Developer",
    candidateName: "Divya Sree",
    email: "divya.sree@example.com",
    phone: "+91 91234 56780",
    experience: "5-8 yrs",
    qualification: "M.E / M.Tech",
    resumeName: "divya_sree_resume.pdf",
    appliedOn: "21 Jul 2026",
    status: "Pending",
  },
  {
    id: 103,
    jobId: 2,
    jobTitle: "Junior Java Developer",
    candidateName: "Karthik Raja",
    email: "karthik.raja@example.com",
    phone: "+91 90000 11122",
    experience: "0-2 yrs",
    qualification: "B.E / B.Tech",
    resumeName: "karthik_raja_resume.pdf",
    appliedOn: "21 Jul 2026",
    status: "Approved",
  },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Company profile", icon: Building2 },
  { id: "post-job", label: "Post a job", icon: PlusCircle },
  { id: "jobs", label: "My job postings", icon: ListChecks },
  { id: "applications", label: "Candidate applications", icon: Users2 },
];

const EMPTY_JOB_FORM = {
  title: "",
  category: "",
  designation: "",
  location: "",
  skills: "",
  salaryMin: "",
  salaryMax: "",
  experience: "",
  qualification: "",
  openings: "1",
  description: "",
};

function currency(v) {
  return `₹${v} LPA`;
}


function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon size={18} />
      </div>
      <div>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}

function VerificationBadge({ status }) {
  const map = {
    pending: { label: "Verification pending", cls: "badge--pending", Icon: Clock },
    verified: { label: "Verified", cls: "badge--verified", Icon: ShieldCheck },
    rejected: { label: "Verification rejected", cls: "badge--rejected", Icon: ShieldAlert },
  };
  const { label, cls, Icon } = map[status];
  return (
    <span className={`badge ${cls}`}>
      <Icon size={14} />
      {label}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    Pending: "status-pill--pending",
    Approved: "status-pill--approved",
    Rejected: "status-pill--rejected",
    Open: "status-pill--approved",
    Closed: "status-pill--rejected",
  };
  return <span className={`status-pill ${map[status] || ""}`}>{status}</span>;
}

function VerificationBanner({ company }) {
  if (company.status === "verified") {
    return (
      <div className="banner banner--verified">
        <ShieldCheck size={18} />
        <div>
          <p className="banner__title">Your company is verified</p>
          <p className="banner__text">You have full access to post job openings and manage applications.</p>
        </div>
      </div>
    );
  }
  if (company.status === "rejected") {
    return (
      <div className="banner banner--rejected">
        <ShieldAlert size={18} />
        <div>
          <p className="banner__title">Verification was rejected</p>
          <p className="banner__text">
            {company.verificationNote || "Please update your company profile and contact support."}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="banner banner--pending">
      <PhoneCall size={18} />
      <div>
        <p className="banner__title">Your company details are under verification</p>
        <p className="banner__text">
          The administrator will verify your company through a phone call or email. Job posting will be
          unlocked once verification is complete.
        </p>
      </div>
    </div>
  );
}

function CandidateDetailModal({ application, onClose, onDecision }) {
  if (!application) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="modal__title">{application.candidateName}</h2>
        <p className="modal__company">
          Applied for {application.jobTitle} · {application.appliedOn}
        </p>

        <div className="modal__grid">
          <div><span className="modal__k">Email</span><span className="modal__v">{application.email}</span></div>
          <div><span className="modal__k">Phone</span><span className="modal__v">{application.phone}</span></div>
          <div><span className="modal__k">Experience</span><span className="modal__v">{application.experience}</span></div>
          <div><span className="modal__k">Qualification</span><span className="modal__v">{application.qualification}</span></div>
          <div><span className="modal__k">Resume</span><span className="modal__v">{application.resumeName}</span></div>
          <div><span className="modal__k">Status</span><span className="modal__v"><StatusPill status={application.status} /></span></div>
        </div>

        {application.status === "Pending" ? (
          <div className="modal__actions">
            <button
              className="btn btn--reject"
              onClick={() => onDecision(application.id, "Rejected")}
            >
              <XCircle size={15} /> Reject
            </button>
            <button
              className="btn btn--primary"
              onClick={() => onDecision(application.id, "Approved")}
            >
              <CheckCircle2 size={15} /> Approve
            </button>
          </div>
        ) : (
          <p className="modal__decided-note">
            You have already <strong>{application.status.toLowerCase()}</strong> this application. The
            candidate was notified by email and SMS.
          </p>
        )}
      </div>
    </div>
  );
}


function DashboardView({ company, jobs, applications, onGoTo }) {
  const pendingCount = applications.filter((a) => a.status === "Pending").length;
  const approvedCount = applications.filter((a) => a.status === "Approved").length;

  return (
    <>
      <VerificationBanner company={company} />

      <div className="stat-grid">
        <StatCard icon={ListChecks} label="Jobs posted" value={jobs.length} />
        <StatCard icon={Users2} label="Total applications" value={applications.length} />
        <StatCard icon={Clock} label="Pending review" value={pendingCount} />
        <StatCard icon={CheckCircle2} label="Approved candidates" value={approvedCount} />
      </div>

      <div className="card">
        <div className="card__header">
          <div>
            <h2 className="card__title">Notifications from RecruitHub</h2>
            <p className="card__subtitle">Emails and SMS sent to your registered contact</p>
          </div>
        </div>
        <ul className="activity-list">
          <li>
            <Mail size={15} />
            Registration confirmation email sent to <strong>{company.email}</strong>
          </li>
          <li>
            <MessageSquare size={15} />
            OTP / confirmation SMS sent to <strong>{company.phone}</strong>
          </li>
          <li>
            <PhoneCall size={15} />
            {company.status === "verified"
              ? "Verification call completed — your account is now active"
              : "Verification call will be scheduled by the administrator shortly"}
          </li>
          <li>
            <Users2 size={15} />
            {applications.length} candidate application(s) received across {jobs.length} job posting(s)
          </li>
        </ul>
      </div>

      <div className="card">
        <div className="card__header">
          <div>
            <h2 className="card__title">Quick actions</h2>
            <p className="card__subtitle">Jump straight into common tasks</p>
          </div>
        </div>
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => onGoTo("post-job")}>
            <PlusCircle size={16} /> Post a new job
          </button>
          <button className="quick-action-btn" onClick={() => onGoTo("jobs")}>
            <ListChecks size={16} /> View my job postings
          </button>
          <button className="quick-action-btn" onClick={() => onGoTo("applications")}>
            <Users2 size={16} /> Review candidate applications
          </button>
        </div>
      </div>
    </>
  );
}

function ProfileView({ company, setCompany, notify }) {
  const [form, setForm] = useState(company);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCompany({ ...form, status: "pending", registeredOn: company.registeredOn });
    notify("Company details submitted for verification. Confirmation email & SMS sent.");
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Company profile</h2>
          <p className="card__subtitle">
            This information is used by the administrator to verify your company
          </p>
        </div>
        <VerificationBadge status={company.status} />
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-form__row">
          <label className="form-field">
            <span>Company name</span>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} required />
          </label>
          <label className="form-field">
            <span>Industry</span>
            <input value={form.industry} onChange={(e) => update("industry", e.target.value)} required />
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Official email</span>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </label>
          <label className="form-field">
            <span>Phone number</span>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Website</span>
            <input value={form.website} onChange={(e) => update("website", e.target.value)} />
          </label>
          <label className="form-field">
            <span>Registered on</span>
            <input value={company.registeredOn} disabled />
          </label>
        </div>

        <label className="form-field">
          <span>Office address</span>
          <textarea rows={3} value={form.address} onChange={(e) => update("address", e.target.value)} required />
        </label>

        <p className="form-note">
          <PhoneCall size={13} /> Submitting changes will re-trigger administrator verification via phone
          call or email before your account is re-approved.
        </p>

        <button type="submit" className="btn btn--primary">
          Save & submit for verification
        </button>
      </form>
    </div>
  );
}

function PostJobView({ company, onCreateJob, notify }) {
  const [form, setForm] = useState(EMPTY_JOB_FORM);
  const locked = company.status !== "verified";

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (locked) return;
    onCreateJob({
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      salaryMin: Number(form.salaryMin) || 0,
      salaryMax: Number(form.salaryMax) || 0,
      openings: Number(form.openings) || 1,
    });
    setForm(EMPTY_JOB_FORM);
    notify("Job submitted successfully — now visible to the administrator.");
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Post a job opening</h2>
          <p className="card__subtitle">
            Job postings are visible to the administrator and go live once reviewed
          </p>
        </div>
      </div>

      {locked && (
        <div className="banner banner--pending" style={{ marginBottom: 20 }}>
          <Lock size={18} />
          <div>
            <p className="banner__title">Job posting is locked</p>
            <p className="banner__text">
              Your company must be verified by the administrator before you can post job openings.
            </p>
          </div>
        </div>
      )}

      <form className="profile-form" onSubmit={handleSubmit}>
        <fieldset disabled={locked} className="job-fieldset">
          <div className="profile-form__row">
            <label className="form-field">
              <span>Job title</span>
              <input value={form.title} onChange={(e) => update("title", e.target.value)} required />
            </label>
            <label className="form-field">
              <span>Designation</span>
              <input value={form.designation} onChange={(e) => update("designation", e.target.value)} required />
            </label>
          </div>

          <div className="profile-form__row">
            <label className="form-field">
              <span><Tag size={13} /> Category</span>
              <select value={form.category} onChange={(e) => update("category", e.target.value)} required>
                <option value="">Select</option>
                {CATEGORY_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span><MapPin size={13} /> Location</span>
              <select value={form.location} onChange={(e) => update("location", e.target.value)} required>
                <option value="">Select</option>
                {LOCATION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="profile-form__row">
            <label className="form-field">
              <span><Clock size={13} /> Experience</span>
              <select value={form.experience} onChange={(e) => update("experience", e.target.value)} required>
                <option value="">Select</option>
                {EXPERIENCE_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span><GraduationCap size={13} /> Qualification</span>
              <select value={form.qualification} onChange={(e) => update("qualification", e.target.value)} required>
                <option value="">Select</option>
                {QUALIFICATION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="profile-form__row">
            <label className="form-field">
              <span><IndianRupee size={13} /> Min. salary (LPA)</span>
              <input type="number" min="0" value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} required />
            </label>
            <label className="form-field">
              <span><IndianRupee size={13} /> Max. salary (LPA)</span>
              <input type="number" min="0" value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} required />
            </label>
          </div>

          <div className="profile-form__row">
            <label className="form-field">
              <span><Wrench size={13} /> Skills (comma separated)</span>
              <input placeholder="e.g. React, Node.js, MongoDB" value={form.skills} onChange={(e) => update("skills", e.target.value)} />
            </label>
            <label className="form-field">
              <span>Number of openings</span>
              <input type="number" min="1" value={form.openings} onChange={(e) => update("openings", e.target.value)} />
            </label>
          </div>

          <label className="form-field">
            <span><FileText size={13} /> Job description</span>
            <textarea rows={4} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </label>

          <button type="submit" className="btn btn--primary btn--icon">
            <PlusCircle size={15} /> Submit job opening
          </button>
        </fieldset>
      </form>
    </div>
  );
}

function JobsView({ jobs, applications, onViewApplications }) {
  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">My job postings</h2>
          <p className="card__subtitle">All openings you've posted, visible to the administrator</p>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Job title</th>
            <th>Category</th>
            <th>Location</th>
            <th>Openings</th>
            <th>Applicants</th>
            <th>Status</th>
            <th>Admin visibility</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const count = applications.filter((a) => a.jobId === job.id).length;
            return (
              <tr key={job.id}>
                <td className="table__title-cell">{job.title}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>
                <td>{job.openings}</td>
                <td>{count}</td>
                <td><StatusPill status={job.status} /></td>
                <td>
                  <span className="visibility-tag">
                    <Eye size={13} /> {job.adminVisibility}
                  </span>
                </td>
                <td className="table__actions-cell">
                  <button className="btn btn--outline btn--sm" onClick={() => onViewApplications(job.id)}>
                    View applicants
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationsView({ applications, jobFilter, setJobFilter, jobs, onOpen }) {
  const filtered = jobFilter ? applications.filter((a) => a.jobId === jobFilter) : applications;

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Candidate applications</h2>
          <p className="card__subtitle">Review, approve or reject applications received for your jobs</p>
        </div>
        <select
          className="job-filter-select"
          value={jobFilter}
          onChange={(e) => setJobFilter(e.target.value ? Number(e.target.value) : "")}
        >
          <option value="">All jobs</option>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>{j.title}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No candidate applications found.</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Applied for</th>
              <th>Experience</th>
              <th>Qualification</th>
              <th>Applied on</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td className="table__title-cell">{a.candidateName}</td>
                <td>{a.jobTitle}</td>
                <td>{a.experience}</td>
                <td>{a.qualification}</td>
                <td>{a.appliedOn}</td>
                <td><StatusPill status={a.status} /></td>
                <td className="table__actions-cell">
                  <button className="btn btn--outline btn--sm" onClick={() => onOpen(a)}>
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}



export default function EmployerDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();
  const [company, setCompany] = useState(INITIAL_COMPANY);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [jobFilter, setJobFilter] = useState("");
  const [reviewing, setReviewing] = useState(null);
  const [toast, setToast] = useState(null);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2400);
  }

  function handleCreateJob(job) {
    setJobs((list) => [
      ...list,
      {
        ...job,
        id: list.length ? Math.max(...list.map((j) => j.id)) + 1 : 1,
        status: "Open",
        adminVisibility: "Visible to admin",
        postedOn: "Today",
      },
    ]);
  }

  function handleDecision(applicationId, status) {
    setApplications((list) =>
      list.map((a) => (a.id === applicationId ? { ...a, status } : a))
    );
    setReviewing((r) => (r ? { ...r, status } : r));
    notify(
      `Application ${status.toLowerCase()} — candidate notified by email & SMS.`
    );
  }

  const activeApplication = useMemo(
    () => applications.find((a) => a.id === reviewing?.id) || reviewing,
    [applications, reviewing]
  );

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__brand-mark">
            <Briefcase size={15} />
          </span>
          <span className="sidebar__brand-name">RecruitHub</span>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__group">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`sidebar__link ${activeNav === item.id ? "sidebar__link--active" : ""}`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__link" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/employer/login"); }}>
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="topbar__title">Employer dashboard</h1>
            <p className="topbar__subtitle">Manage your company profile, job postings and applicants</p>
          </div>
          <div className="topbar__user">
            <span className="topbar__avatar">{company.name.charAt(0)}</span>
            <span className="topbar__username">{company.name}</span>
            <VerificationBadge status={company.status} />
          </div>
        </header>

        <div className="content">
          {activeNav === "dashboard" && (
            <DashboardView
              company={company}
              jobs={jobs}
              applications={applications}
              onGoTo={setActiveNav}
            />
          )}

          {activeNav === "profile" && (
            <ProfileView company={company} setCompany={setCompany} notify={notify} />
          )}

          {activeNav === "post-job" && (
            <PostJobView company={company} onCreateJob={handleCreateJob} notify={notify} />
          )}

          {activeNav === "jobs" && (
            <JobsView
              jobs={jobs}
              applications={applications}
              onViewApplications={(jobId) => {
                setJobFilter(jobId);
                setActiveNav("applications");
              }}
            />
          )}

          {activeNav === "applications" && (
            <ApplicationsView
              applications={applications}
              jobs={jobs}
              jobFilter={jobFilter}
              setJobFilter={setJobFilter}
              onOpen={setReviewing}
            />
          )}
        </div>
      </main>

      <CandidateDetailModal
        application={activeApplication}
        onClose={() => setReviewing(null)}
        onDecision={handleDecision}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
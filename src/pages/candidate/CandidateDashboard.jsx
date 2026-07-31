import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  Search,
  FileCheck2,
  UserCircle2,
  LogOut,
  Building2,
  Tag,
  Layers,
  MapPin,
  Wrench,
  IndianRupee,
  GraduationCap,
  BarChart3,
  Clock,
  CheckCircle2,
  X,
  Upload,
  Plus,
  Bell,
  Mail,
  MessageSquare,
} from "lucide-react";
import "./CandidateDashboard.css";


const JOBS = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "Zenith Softech",
    category: "Engineering",
    designation: "Senior Developer",
    location: "Chennai",
    skills: ["React", "JavaScript", "Redux"],
    salaryMin: 12,
    salaryMax: 18,
    experience: "4-6 yrs",
    qualification: "B.E / B.Tech",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "HR Business Partner",
    company: "NovaWorks HR Solutions",
    category: "Human Resources",
    designation: "Business Partner",
    location: "Bengaluru",
    skills: ["Recruitment", "Employee Relations"],
    salaryMin: 9,
    salaryMax: 14,
    experience: "5-8 yrs",
    qualification: "MBA HR",
    posted: "4 days ago",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Bluepeak Analytics",
    category: "Analytics",
    designation: "Analyst",
    location: "Hyderabad",
    skills: ["SQL", "Python", "Power BI"],
    salaryMin: 6,
    salaryMax: 10,
    experience: "1-3 yrs",
    qualification: "B.Sc / B.Tech",
    posted: "1 day ago",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Studio Loop",
    category: "Design",
    designation: "Designer",
    location: "Remote",
    skills: ["Figma", "Prototyping", "User Research"],
    salaryMin: 7,
    salaryMax: 11,
    experience: "2-4 yrs",
    qualification: "Any Degree",
    posted: "6 hours ago",
  },
  {
    id: 5,
    title: "Junior Java Developer",
    company: "Zenith Softech",
    category: "Engineering",
    designation: "Junior Developer",
    location: "Chennai",
    skills: ["Java", "Spring Boot", "MySQL"],
    salaryMin: 4,
    salaryMax: 7,
    experience: "0-2 yrs",
    qualification: "B.E / B.Tech",
    posted: "3 days ago",
  },
  {
    id: 6,
    title: "Talent Acquisition Specialist",
    company: "NovaWorks HR Solutions",
    category: "Human Resources",
    designation: "Specialist",
    location: "Bengaluru",
    skills: ["Sourcing", "Interviewing"],
    salaryMin: 5,
    salaryMax: 8,
    experience: "1-3 yrs",
    qualification: "MBA HR",
    posted: "1 week ago",
  },
];

const FILTER_OPTIONS = {
  company: ["Zenith Softech", "NovaWorks HR Solutions", "Bluepeak Analytics", "Studio Loop"],
  category: ["Engineering", "Human Resources", "Analytics", "Design"],
  designation: ["Senior Developer", "Junior Developer", "Business Partner", "Analyst", "Designer", "Specialist"],
  location: ["Chennai", "Bengaluru", "Hyderabad", "Remote"],
  skills: ["React", "Java", "Python", "SQL", "Figma", "Recruitment", "Spring Boot"],
  experience: ["0-2 yrs", "1-3 yrs", "2-4 yrs", "4-6 yrs", "5-8 yrs"],
  qualification: ["Any Degree", "B.E / B.Tech", "B.Sc / B.Tech", "MBA HR"],
};

const EMPTY_FILTERS = {
  keyword: "",
  company: "",
  category: "",
  designation: "",
  location: "",
  skills: "",
  minSalary: "",
  experience: "",
  qualification: "",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "jobs", label: "Find jobs", icon: Search },
  { id: "applications", label: "My applications", icon: FileCheck2 },
  { id: "profile", label: "My profile / resume", icon: UserCircle2 },
];

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

function FilterSelect({ icon: Icon, label, value, onChange, options }) {
  return (
    <label className="filter-field">
      <span className="filter-field__label">
        <Icon size={13} />
        {label}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Any</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function JobCard({ job, applied, onApply, onView }) {
  return (
    <div className="job-card">
      <div className="job-card__main">
        <div className="job-card__top">
          <h3 className="job-card__title">{job.title}</h3>
          <span className="job-card__posted">{job.posted}</span>
        </div>
        <p className="job-card__company">{job.company}</p>

        <div className="job-card__meta">
          <span><MapPin size={13} /> {job.location}</span>
          <span><Layers size={13} /> {job.designation}</span>
          <span><IndianRupee size={13} /> {currency(job.salaryMin)} - {currency(job.salaryMax)}</span>
          <span><Clock size={13} /> {job.experience}</span>
          <span><GraduationCap size={13} /> {job.qualification}</span>
        </div>

        <div className="job-card__skills">
          {job.skills.map((s) => (
            <span key={s} className="skill-chip">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="job-card__actions">
        <button className="btn btn--outline" onClick={() => onView(job)}>
          View details
        </button>
        <button
          className={`btn ${applied ? "btn--applied" : "btn--primary"}`}
          onClick={() => !applied && onApply(job)}
          disabled={applied}
        >
          {applied ? (
            <>
              <CheckCircle2 size={15} /> Applied
            </>
          ) : (
            "Apply now"
          )}
        </button>
      </div>
    </div>
  );
}

function JobDetailModal({ job, applied, onApply, onClose }) {
  if (!job) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="modal__title">{job.title}</h2>
        <p className="modal__company">{job.company} · {job.location}</p>

        <div className="modal__grid">
          <div><span className="modal__k">Category</span><span className="modal__v">{job.category}</span></div>
          <div><span className="modal__k">Designation</span><span className="modal__v">{job.designation}</span></div>
          <div><span className="modal__k">Salary</span><span className="modal__v">{currency(job.salaryMin)} - {currency(job.salaryMax)}</span></div>
          <div><span className="modal__k">Experience</span><span className="modal__v">{job.experience}</span></div>
          <div><span className="modal__k">Qualification</span><span className="modal__v">{job.qualification}</span></div>
          <div><span className="modal__k">Posted</span><span className="modal__v">{job.posted}</span></div>
        </div>

        <div className="job-card__skills" style={{ margin: "16px 0" }}>
          {job.skills.map((s) => (
            <span key={s} className="skill-chip">{s}</span>
          ))}
        </div>

        <p className="modal__desc">
          We're looking for a {job.title.toLowerCase()} to join {job.company}. You'll work closely with
          cross-functional teams, contribute to key deliverables, and grow your career in a
          collaborative environment.
        </p>

        <button
          className={`btn ${applied ? "btn--applied" : "btn--primary"} btn--full`}
          onClick={() => !applied && onApply(job)}
          disabled={applied}
        >
          {applied ? (
            <>
              <CheckCircle2 size={15} /> Application submitted
            </>
          ) : (
            "Apply for this job"
          )}
        </button>
      </div>
    </div>
  );
}


function DashboardView({ appliedCount, profileCompletion, onGoToJobs }) {
  return (
    <>
      <div className="stat-grid">
        <StatCard icon={FileCheck2} label="Jobs applied" value={appliedCount} />
        <StatCard icon={Search} label="Open matches" value={JOBS.length} />
        <StatCard icon={BarChart3} label="Profile completion" value={`${profileCompletion}%`} />
        <StatCard icon={Bell} label="New notifications" value={2} />
      </div>

      <div className="card">
        <div className="card__header">
          <div>
            <h2 className="card__title">Ready to find your next role?</h2>
            <p className="card__subtitle">
              Search by company, category, designation, location, skills, salary, experience or
              qualification.
            </p>
          </div>
          <button className="btn btn--primary btn--icon" onClick={onGoToJobs}>
            <Search size={15} />
            Find jobs
          </button>
        </div>
        <div className="quick-links">
          {["Company", "Category", "Designation", "Location", "Skills", "Salary", "Experience", "Qualification"].map(
            (f) => (
              <span key={f} className="quick-link-chip">
                {f}
              </span>
            )
          )}
        </div>
      </div>

      <div className="card">
        <h2 className="card__title">Recent activity</h2>
        <p className="card__subtitle">Your latest applications and updates</p>
        <ul className="activity-list">
          <li>
            <Mail size={15} />
            Confirmation email sent for <strong>Senior React Developer</strong> at Zenith Softech
          </li>
          <li>
            <MessageSquare size={15} />
            SMS confirmation sent for <strong>Data Analyst</strong> at Bluepeak Analytics
          </li>
          <li>
            <UserCircle2 size={15} />
            Profile updated — added 2 new skills
          </li>
        </ul>
      </div>
    </>
  );
}

function JobsView({ filters, setFilters, filteredJobs, appliedIds, onApply, onView }) {
  function updateFilter(key, value) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  return (
    <>
      <div className="card">
        <h2 className="card__title">Search jobs</h2>
        <p className="card__subtitle">Filter by any combination — all filters are optional</p>

        <input
          className="search-input"
          placeholder="Search by job title or keyword..."
          value={filters.keyword}
          onChange={(e) => updateFilter("keyword", e.target.value)}
        />

        <div className="filter-grid">
          <FilterSelect icon={Building2} label="Company" value={filters.company} onChange={(v) => updateFilter("company", v)} options={FILTER_OPTIONS.company} />
          <FilterSelect icon={Tag} label="Category" value={filters.category} onChange={(v) => updateFilter("category", v)} options={FILTER_OPTIONS.category} />
          <FilterSelect icon={Layers} label="Designation" value={filters.designation} onChange={(v) => updateFilter("designation", v)} options={FILTER_OPTIONS.designation} />
          <FilterSelect icon={MapPin} label="Location" value={filters.location} onChange={(v) => updateFilter("location", v)} options={FILTER_OPTIONS.location} />
          <FilterSelect icon={Wrench} label="Skills" value={filters.skills} onChange={(v) => updateFilter("skills", v)} options={FILTER_OPTIONS.skills} />
          <FilterSelect icon={Clock} label="Experience" value={filters.experience} onChange={(v) => updateFilter("experience", v)} options={FILTER_OPTIONS.experience} />
          <FilterSelect icon={GraduationCap} label="Qualification" value={filters.qualification} onChange={(v) => updateFilter("qualification", v)} options={FILTER_OPTIONS.qualification} />
          <label className="filter-field">
            <span className="filter-field__label">
              <IndianRupee size={13} />
              Min. salary (LPA)
            </span>
            <input
              type="number"
              min="0"
              placeholder="e.g. 6"
              value={filters.minSalary}
              onChange={(e) => updateFilter("minSalary", e.target.value)}
            />
          </label>
        </div>

        <div className="filter-actions">
          <button className="btn btn--outline" onClick={() => setFilters(EMPTY_FILTERS)}>
            Clear filters
          </button>
          <span className="filter-count">{filteredJobs.length} job(s) found</span>
        </div>
      </div>

      <div className="job-list">
        {filteredJobs.length === 0 && (
          <div className="card empty-state">No jobs match your filters. Try broadening your search.</div>
        )}
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            applied={appliedIds.includes(job.id)}
            onApply={onApply}
            onView={onView}
          />
        ))}
      </div>
    </>
  );
}

function ApplicationsView({ appliedJobs }) {
  return (
    <div className="card">
      <h2 className="card__title">My applications</h2>
      <p className="card__subtitle">Track the status of jobs you've applied to</p>

      {appliedJobs.length === 0 ? (
        <div className="empty-state">
          You haven't applied to any jobs yet. Head to <strong>Find jobs</strong> to get started.
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Job title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Applied on</th>
              <th>Status</th>
              <th>Notifications</th>
            </tr>
          </thead>
          <tbody>
            {appliedJobs.map((job) => (
              <tr key={job.id}>
                <td className="table__title-cell">{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>Just now</td>
                <td>
                  <span className="status-pill status-pill--pending">Under review</span>
                </td>
                <td className="table__notif-cell">
                  <span title="Email sent"><Mail size={14} /></span>
                  <span title="SMS sent"><MessageSquare size={14} /></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function ProfileView({ profile, setProfile, onSave, saved }) {
  const [skillInput, setSkillInput] = useState("");

  function update(key, value) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  function addSkill() {
    const s = skillInput.trim();
    if (s && !profile.skills.includes(s)) {
      update("skills", [...profile.skills, s]);
    }
    setSkillInput("");
  }

  function removeSkill(s) {
    update("skills", profile.skills.filter((x) => x !== s));
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">My profile / resume</h2>
          <p className="card__subtitle">Keep this updated — recruiters view this when you apply</p>
        </div>
        <button className="btn btn--primary" onClick={onSave}>
          {saved ? "Saved ✓" : "Save profile"}
        </button>
      </div>

      <div className="profile-form">
        <div className="profile-form__row">
          <label className="form-field">
            <span>Full name</span>
            <input value={profile.name} onChange={(e) => update("name", e.target.value)} />
          </label>
          <label className="form-field">
            <span>Headline</span>
            <input
              placeholder="e.g. Senior React Developer"
              value={profile.headline}
              onChange={(e) => update("headline", e.target.value)}
            />
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Email</span>
            <input type="email" value={profile.email} onChange={(e) => update("email", e.target.value)} />
          </label>
          <label className="form-field">
            <span>Phone</span>
            <input value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Experience</span>
            <select value={profile.experience} onChange={(e) => update("experience", e.target.value)}>
              <option value="">Select</option>
              {FILTER_OPTIONS.experience.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Qualification</span>
            <select value={profile.qualification} onChange={(e) => update("qualification", e.target.value)}>
              <option value="">Select</option>
              {FILTER_OPTIONS.qualification.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="form-field">
          <span>Skills</span>
          <div className="skill-input-row">
            <input
              placeholder="Type a skill and press Add"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <button type="button" className="btn btn--outline" onClick={addSkill}>
              <Plus size={14} /> Add
            </button>
          </div>
          <div className="job-card__skills" style={{ marginTop: 10 }}>
            {profile.skills.map((s) => (
              <span key={s} className="skill-chip skill-chip--removable">
                {s}
                <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </label>

        <label className="form-field">
          <span>Professional summary</span>
          <textarea
            rows={4}
            placeholder="A short summary about your experience and career goals..."
            value={profile.summary}
            onChange={(e) => update("summary", e.target.value)}
          />
        </label>

        <label className="form-field">
          <span>Resume</span>
          <div className="resume-upload">
            <Upload size={16} />
            <span>{profile.resumeName || "Upload your resume (PDF/DOCX)"}</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => update("resumeName", e.target.files?.[0]?.name || "")}
            />
          </div>
        </label>
      </div>
    </div>
  );
}


export default function CandidateDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedIds, setAppliedIds] = useState([]);
  const [viewingJob, setViewingJob] = useState(null);
  const [toast, setToast] = useState(null);
  const [profileSaved, setProfileSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Arun Kumar",
    headline: "Frontend Developer",
    email: "arun.kumar@example.com",
    phone: "+91 98765 43210",
    experience: "2-4 yrs",
    qualification: "B.E / B.Tech",
    skills: ["React", "JavaScript"],
    summary: "",
    resumeName: "",
  });

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2200);
  }

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      if (filters.keyword && !job.title.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
      if (filters.company && job.company !== filters.company) return false;
      if (filters.category && job.category !== filters.category) return false;
      if (filters.designation && job.designation !== filters.designation) return false;
      if (filters.location && job.location !== filters.location) return false;
      if (filters.skills && !job.skills.includes(filters.skills)) return false;
      if (filters.experience && job.experience !== filters.experience) return false;
      if (filters.qualification && job.qualification !== filters.qualification) return false;
      if (filters.minSalary && job.salaryMax < Number(filters.minSalary)) return false;
      return true;
    });
  }, [filters]);

  const appliedJobs = useMemo(() => JOBS.filter((j) => appliedIds.includes(j.id)), [appliedIds]);

  const profileCompletion = useMemo(() => {
    const fields = [profile.name, profile.headline, profile.email, profile.phone, profile.experience, profile.qualification, profile.summary, profile.resumeName];
    const filled = fields.filter(Boolean).length + (profile.skills.length > 0 ? 1 : 0);
    return Math.round((filled / (fields.length + 1)) * 100);
  }, [profile]);

  function handleApply(job) {
    setAppliedIds((ids) => (ids.includes(job.id) ? ids : [...ids, job.id]));
    setViewingJob(null);
    notify(`Applied to ${job.title}! Confirmation email & SMS sent.`);
  }

  function handleSaveProfile() {
    setProfileSaved(true);
    notify("Profile saved successfully");
    window.setTimeout(() => setProfileSaved(false), 2000);
  }

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
          <button className="sidebar__link" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/candidate/login"); }}>
            <LogOut size={15} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="topbar__title">Candidate dashboard</h1>
            <p className="topbar__subtitle">Search, apply and track your job applications</p>
          </div>
          <div className="topbar__user">
            <span className="topbar__avatar">{profile.name.charAt(0)}</span>
            <span className="topbar__username">{profile.name}</span>
          </div>
        </header>

        <div className="content">
          {activeNav === "dashboard" && (
            <DashboardView
              appliedCount={appliedIds.length}
              profileCompletion={profileCompletion}
              onGoToJobs={() => setActiveNav("jobs")}
            />
          )}

          {activeNav === "jobs" && (
            <JobsView
              filters={filters}
              setFilters={setFilters}
              filteredJobs={filteredJobs}
              appliedIds={appliedIds}
              onApply={handleApply}
              onView={setViewingJob}
            />
          )}

          {activeNav === "applications" && <ApplicationsView appliedJobs={appliedJobs} />}

          {activeNav === "profile" && (
            <ProfileView
              profile={profile}
              setProfile={setProfile}
              onSave={handleSaveProfile}
              saved={profileSaved}
            />
          )}
        </div>
      </main>

      <JobDetailModal
        job={viewingJob}
        applied={viewingJob ? appliedIds.includes(viewingJob.id) : false}
        onApply={handleApply}
        onClose={() => setViewingJob(null)}
      />

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
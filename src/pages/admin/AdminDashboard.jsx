import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  LayoutDashboard,
  Building2,
  Tag,
  Layers,
  MapPin,
  Wrench,
  ListChecks,
  Mail,
  MessageSquare,
  UsersRound,
  ShieldCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  UserCheck,
} from "lucide-react";
import "./AdminDashboard.css";


const INITIAL_COMPANIES = [
  { id: 1, name: "Zenith Softech", email: "hr@zenithsoftech.com", phone: "+91 98765 12340", industry: "Information Technology", status: "approved" },
  { id: 2, name: "Bluewave Analytics", email: "careers@bluewave.com", phone: "+91 90000 22331", industry: "Analytics", status: "pending" },
  { id: 3, name: "Orion Health Systems", email: "jobs@orionhealth.com", phone: "+91 91234 88990", industry: "Healthcare", status: "pending" },
  { id: 4, name: "Pinnacle Retail Group", email: "hr@pinnacleretail.com", phone: "+91 99887 76655", industry: "Retail", status: "rejected" },
];

const INITIAL_CATEGORIES = [
  { id: 1, name: "Engineering" },
  { id: 2, name: "Human Resources" },
  { id: 3, name: "Analytics" },
  { id: 4, name: "Design" },
];

const INITIAL_DESIGNATIONS = [
  { id: 1, name: "Senior Developer" },
  { id: 2, name: "Junior Developer" },
  { id: 3, name: "HR Business Partner" },
  { id: 4, name: "UI/UX Designer" },
];

const INITIAL_LOCATIONS = [
  { id: 1, name: "Chennai" },
  { id: 2, name: "Bengaluru" },
  { id: 3, name: "Hyderabad" },
  { id: 4, name: "Remote" },
];

const INITIAL_SKILLS = [
  { id: 1, name: "React" },
  { id: 2, name: "Java" },
  { id: 3, name: "Spring Boot" },
  { id: 4, name: "SQL" },
];

const INITIAL_JOBS = [
  { id: 1, title: "Senior React Developer", company: "Zenith Softech", category: "Engineering", designation: "Senior Developer", location: "Chennai", skills: "React, JavaScript, Redux", salaryMin: 12, salaryMax: 18, experience: "4-6 yrs", qualification: "B.E / B.Tech", status: "Open" },
  { id: 2, title: "HR Business Partner", company: "Bluewave Analytics", category: "Human Resources", designation: "HR Business Partner", location: "Bengaluru", skills: "Recruitment, Payroll", salaryMin: 8, salaryMax: 12, experience: "3-5 yrs", qualification: "MBA", status: "Open" },
  { id: 3, title: "Data Analyst", company: "Bluewave Analytics", category: "Analytics", designation: "Data Analyst", location: "Hyderabad", skills: "SQL, Power BI, Python", salaryMin: 6, salaryMax: 10, experience: "1-3 yrs", qualification: "B.Sc / B.Tech", status: "Open" },
  { id: 4, title: "UI/UX Designer", company: "Zenith Softech", category: "Design", designation: "UI/UX Designer", location: "Remote", skills: "Figma, Prototyping", salaryMin: 7, salaryMax: 11, experience: "2-4 yrs", qualification: "Any Degree", status: "Closed" },
];

const INITIAL_EMPLOYEES = [
  { id: 1, name: "Priya Natarajan", email: "priya.n@recruithub.com", phone: "+91 98400 11223", role: "Recruiter" },
  { id: 2, name: "Suresh Babu", email: "suresh.b@recruithub.com", phone: "+91 97890 33445", role: "HR Executive" },
];

const CANDIDATE_COUNT = 12406;
const EXPERIENCE_OPTIONS = ["0-2 yrs", "1-3 yrs", "2-4 yrs", "3-5 yrs", "4-6 yrs", "5-8 yrs", "8+ yrs"];
const QUALIFICATION_OPTIONS = ["Any Degree", "B.E / B.Tech", "B.Sc / B.Tech", "MBA", "M.E / M.Tech"];
const EMPLOYEE_ROLES = ["Recruiter", "HR Executive", "Team Lead", "Account Manager"];

const NAV_SECTIONS = [
  {
    heading: "Setup",
    items: [
      { id: "companies", label: "Recruitment companies", icon: Building2 },
      { id: "approvals", label: "Company approvals", icon: ShieldCheck },
      { id: "categories", label: "Job categories", icon: Tag },
      { id: "designations", label: "Job designations", icon: Layers },
      { id: "locations", label: "Job locations", icon: MapPin },
      { id: "skills", label: "Job skills", icon: Wrench },
    ],
  },
  {
    heading: "Job openings",
    items: [{ id: "jobs", label: "All job openings", icon: ListChecks }],
  },
  {
    heading: "Communication",
    items: [
      { id: "mail", label: "Mail center", icon: Mail },
      { id: "sms", label: "SMS center", icon: MessageSquare },
    ],
  },
  {
    heading: "Team",
    items: [{ id: "employees", label: "Employees & roles", icon: UsersRound }],
  },
];

let idCounter = 1000;
function nextId() {
  idCounter += 1;
  return idCounter;
}


function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon size={18} />
      </div>
      <div>
        <p className="stat-card__value">{value.toLocaleString("en-IN")}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Open: "status-pill--approved",
    Closed: "status-pill--rejected",
    approved: "status-pill--approved",
    pending: "status-pill--pending",
    rejected: "status-pill--rejected",
  };
  const labelMap = { approved: "Approved", pending: "Pending", rejected: "Rejected" };
  return <span className={`status-pill ${map[status] || ""}`}>{labelMap[status] || status}</span>;
}

function Modal({ title, subtitle, onClose, children, wide }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className={`modal ${wide ? "modal--wide" : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
        <h2 className="modal__title">{title}</h2>
        {subtitle && <p className="modal__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ message, onCancel, onConfirm }) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal modal--sm" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-message">{message}</p>
        <div className="modal__actions">
          <button className="btn btn--outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn--reject" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// Dashboard home


function DashboardView({ companies, jobs, employees, onGoTo }) {
  const pendingApprovals = companies.filter((c) => c.status === "pending").length;
  return (
    <>
      <div className="stat-grid">
        <StatCard icon={Briefcase} label="Total job openings" value={jobs.length} />
        <StatCard icon={Building2} label="Recruitment companies" value={companies.length} />
        <StatCard icon={Users} label="Registered candidates" value={CANDIDATE_COUNT} />
        <StatCard icon={UserCheck} label="Employees onboarded" value={employees.length} />
      </div>

      {pendingApprovals > 0 && (
        <div className="banner banner--pending">
          <Clock size={18} />
          <div>
            <p className="banner__title">{pendingApprovals} company profile(s) awaiting approval</p>
            <p className="banner__text">Review registration details and approve or reject access to post jobs.</p>
          </div>
          <button className="btn btn--primary btn--sm" onClick={() => onGoTo("approvals")}>Review now</button>
        </div>
      )}

      <div className="card">
        <h2 className="card__title">Quick setup</h2>
        <p className="card__subtitle">Create the building blocks for job postings</p>
        <div className="quick-actions">
          <button className="quick-action-btn" onClick={() => onGoTo("companies")}><Building2 size={16} /> Add company</button>
          <button className="quick-action-btn" onClick={() => onGoTo("categories")}><Tag size={16} /> Add category</button>
          <button className="quick-action-btn" onClick={() => onGoTo("designations")}><Layers size={16} /> Add designation</button>
          <button className="quick-action-btn" onClick={() => onGoTo("locations")}><MapPin size={16} /> Add location</button>
          <button className="quick-action-btn" onClick={() => onGoTo("skills")}><Wrench size={16} /> Add skill</button>
          <button className="quick-action-btn" onClick={() => onGoTo("employees")}><UserCheck size={16} /> Add employee</button>
        </div>
      </div>
    </>
  );
}


function ApprovalsView({ companies, onDecision, notify }) {
  const pending = companies.filter((c) => c.status === "pending");

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Company profile approvals</h2>
          <p className="card__subtitle">Approve or reject registration profiles submitted by companies</p>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="empty-state">No pending company profiles right now.</div>
      ) : (
        <div className="approval-list">
          {pending.map((c) => (
            <div key={c.id} className="approval-row">
              <div>
                <p className="approval-row__name">{c.name}</p>
                <p className="approval-row__meta">{c.industry} · {c.email} · {c.phone}</p>
              </div>
              <div className="approval-row__actions">
                <button
                  className="btn btn--reject btn--sm"
                  onClick={() => {
                    onDecision(c.id, "rejected");
                    notify(`${c.name} rejected — notified by email & SMS.`);
                  }}
                >
                  <XCircle size={14} /> Reject
                </button>
                <button
                  className="btn btn--primary btn--sm"
                  onClick={() => {
                    onDecision(c.id, "approved");
                    notify(`${c.name} approved — can now post job openings.`);
                  }}
                >
                  <CheckCircle2 size={14} /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function CompanyFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", email: "", phone: "", industry: "", status: "pending" }
  );
  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
  return (
    <Modal title={initial ? "Edit company" : "Add recruitment company"} onClose={onClose}>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Company name</span>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </label>
        <div className="profile-form__row">
          <label className="form-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </label>
          <label className="form-field">
            <span>Phone</span>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </label>
        </div>
        <label className="form-field">
          <span>Industry</span>
          <input value={form.industry} onChange={(e) => update("industry", e.target.value)} required />
        </label>
        <button type="submit" className="btn btn--primary btn--full">Save company</button>
      </form>
    </Modal>
  );
}

function CompaniesView({ companies, setCompanies, notify }) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const filtered = companies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  function handleSave(form) {
    if (editing) {
      setCompanies((list) => list.map((c) => (c.id === editing.id ? { ...c, ...form } : c)));
      notify("Company details updated.");
      setEditing(null);
    } else {
      setCompanies((list) => [...list, { ...form, id: nextId() }]);
      notify("Company added successfully.");
      setAdding(false);
    }
  }

  function handleDelete() {
    setCompanies((list) => list.filter((c) => c.id !== deleting.id));
    notify(`${deleting.name} removed.`);
    setDeleting(null);
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Recruitment companies</h2>
          <p className="card__subtitle">Create, edit, or remove registered companies</p>
        </div>
        <button className="btn btn--primary btn--icon" onClick={() => setAdding(true)}>
          <Plus size={15} /> Add company
        </button>
      </div>

      <div className="search-row">
        <Search size={15} />
        <input placeholder="Search companies..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Industry</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th className="table__actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td className="table__title-cell">{c.name}</td>
              <td>{c.industry}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td><StatusPill status={c.status} /></td>
              <td className="table__actions-cell">
                <button className="icon-btn" onClick={() => setEditing(c)} aria-label="Edit"><Pencil size={15} /></button>
                <button className="icon-btn icon-btn--danger" onClick={() => setDeleting(c)} aria-label="Delete"><Trash2 size={15} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(adding || editing) && (
        <CompanyFormModal
          initial={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.name}"? This cannot be undone.`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}


function SimpleEntityView({ title, subtitle, icon: Icon, items, setItems, notify, singularLabel }) {
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));

  function handleAdd(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setItems((list) => [...list, { id: nextId(), name: name.trim() }]);
    notify(`${singularLabel} added.`);
    setName("");
  }

  function handleUpdate(e) {
    e.preventDefault();
    setItems((list) => list.map((i) => (i.id === editing.id ? { ...i, name: editing.name } : i)));
    notify(`${singularLabel} updated.`);
    setEditing(null);
  }

  function handleDelete() {
    setItems((list) => list.filter((i) => i.id !== deleting.id));
    notify(`${singularLabel} deleted.`);
    setDeleting(null);
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">{title}</h2>
          <p className="card__subtitle">{subtitle}</p>
        </div>
      </div>

      <form className="inline-add-form" onSubmit={handleAdd}>
        <Icon size={15} />
        <input
          placeholder={`Add new ${singularLabel.toLowerCase()}...`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="btn btn--primary btn--sm">
          <Plus size={14} /> Add
        </button>
      </form>

      <div className="search-row">
        <Search size={15} />
        <input placeholder={`Search ${title.toLowerCase()}...`} value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <ul className="chip-list">
        {filtered.map((item) => (
          <li key={item.id} className="chip-row">
            {editing?.id === item.id ? (
              <form className="chip-row__edit" onSubmit={handleUpdate}>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} autoFocus />
                <button type="submit" className="btn btn--primary btn--sm">Save</button>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => setEditing(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <span>{item.name}</span>
                <span className="chip-row__actions">
                  <button className="icon-btn" onClick={() => setEditing(item)} aria-label="Edit"><Pencil size={14} /></button>
                  <button className="icon-btn icon-btn--danger" onClick={() => setDeleting(item)} aria-label="Delete"><Trash2 size={14} /></button>
                </span>
              </>
            )}
          </li>
        ))}
        {filtered.length === 0 && <li className="empty-state">No {title.toLowerCase()} found.</li>}
      </ul>

      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.name}"?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}


const EMPTY_JOB = {
  title: "", company: "", category: "", designation: "", location: "",
  skills: "", salaryMin: "", salaryMax: "", experience: "", qualification: "", status: "Open",
};

function JobFormModal({ initial, companies, categories, designations, locations, onClose, onSave }) {
  const [form, setForm] = useState(initial || EMPTY_JOB);
  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
  return (
    <Modal title={initial ? "Edit job opening" : "Create job opening"} wide onClose={onClose}>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label className="form-field">
          <span>Job title</span>
          <input value={form.title} onChange={(e) => update("title", e.target.value)} required />
        </label>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Company</span>
            <select value={form.company} onChange={(e) => update("company", e.target.value)} required>
              <option value="">Select</option>
              {companies.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </label>
          <label className="form-field">
            <span>Category</span>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} required>
              <option value="">Select</option>
              {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Designation</span>
            <select value={form.designation} onChange={(e) => update("designation", e.target.value)} required>
              <option value="">Select</option>
              {designations.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </label>
          <label className="form-field">
            <span>Location</span>
            <select value={form.location} onChange={(e) => update("location", e.target.value)} required>
              <option value="">Select</option>
              {locations.map((l) => <option key={l.id} value={l.name}>{l.name}</option>)}
            </select>
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Experience</span>
            <select value={form.experience} onChange={(e) => update("experience", e.target.value)} required>
              <option value="">Select</option>
              {EXPERIENCE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
          <label className="form-field">
            <span>Qualification</span>
            <select value={form.qualification} onChange={(e) => update("qualification", e.target.value)} required>
              <option value="">Select</option>
              {QUALIFICATION_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </label>
        </div>

        <div className="profile-form__row">
          <label className="form-field">
            <span>Min. salary (LPA)</span>
            <input type="number" min="0" value={form.salaryMin} onChange={(e) => update("salaryMin", e.target.value)} required />
          </label>
          <label className="form-field">
            <span>Max. salary (LPA)</span>
            <input type="number" min="0" value={form.salaryMax} onChange={(e) => update("salaryMax", e.target.value)} required />
          </label>
        </div>

        <label className="form-field">
          <span>Skills (comma separated)</span>
          <input value={form.skills} onChange={(e) => update("skills", e.target.value)} placeholder="e.g. React, Node.js" />
        </label>

        <label className="form-field">
          <span>Status</span>
          <select value={form.status} onChange={(e) => update("status", e.target.value)}>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <button type="submit" className="btn btn--primary btn--full">Save job opening</button>
      </form>
    </Modal>
  );
}

function JobViewModal({ job, onClose }) {
  if (!job) return null;
  return (
    <Modal title={job.title} subtitle={`${job.company} · ${job.location}`} onClose={onClose}>
      <div className="modal__grid">
        <div><span className="modal__k">Category</span><span className="modal__v">{job.category}</span></div>
        <div><span className="modal__k">Designation</span><span className="modal__v">{job.designation}</span></div>
        <div><span className="modal__k">Experience</span><span className="modal__v">{job.experience}</span></div>
        <div><span className="modal__k">Qualification</span><span className="modal__v">{job.qualification}</span></div>
        <div><span className="modal__k">Salary</span><span className="modal__v">₹{job.salaryMin}–{job.salaryMax} LPA</span></div>
        <div><span className="modal__k">Status</span><span className="modal__v"><StatusPill status={job.status} /></span></div>
      </div>
      <p className="modal__k" style={{ marginTop: 16 }}>Skills</p>
      <p className="modal__v">{job.skills}</p>
    </Modal>
  );
}

function JobsView({ jobs, setJobs, companies, categories, designations, locations, notify }) {
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(query.toLowerCase()));

  function handleSave(form) {
    if (editing) {
      setJobs((list) => list.map((j) => (j.id === editing.id ? { ...j, ...form } : j)));
      notify("Job opening updated.");
      setEditing(null);
    } else {
      setJobs((list) => [...list, { ...form, id: nextId() }]);
      notify("Job opening created.");
      setAdding(false);
    }
  }

  function handleDelete() {
    setJobs((list) => list.filter((j) => j.id !== deleting.id));
    notify(`"${deleting.title}" deleted.`);
    setDeleting(null);
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">All job openings</h2>
          <p className="card__subtitle">View, edit, update or delete any posted opening</p>
        </div>
        <button className="btn btn--primary btn--icon" onClick={() => setAdding(true)}>
          <Plus size={15} /> Create job
        </button>
      </div>

      <div className="search-row">
        <Search size={15} />
        <input placeholder="Search job openings..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Job title</th>
            <th>Company</th>
            <th>Category</th>
            <th>Location</th>
            <th>Status</th>
            <th className="table__actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((job) => (
            <tr key={job.id}>
              <td className="table__title-cell">{job.title}</td>
              <td>{job.company}</td>
              <td>{job.category}</td>
              <td>{job.location}</td>
              <td><StatusPill status={job.status} /></td>
              <td className="table__actions-cell">
                <button className="icon-btn" onClick={() => setViewing(job)} aria-label="View"><Search size={14} /></button>
                <button className="icon-btn" onClick={() => setEditing(job)} aria-label="Edit"><Pencil size={15} /></button>
                <button className="icon-btn icon-btn--danger" onClick={() => setDeleting(job)} aria-label="Delete"><Trash2 size={15} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(adding || editing) && (
        <JobFormModal
          initial={editing}
          companies={companies}
          categories={categories}
          designations={designations}
          locations={locations}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
      {viewing && <JobViewModal job={viewing} onClose={() => setViewing(null)} />}
      {deleting && (
        <ConfirmDialog
          message={`Delete "${deleting.title}"? This cannot be undone.`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

const EMPTY_EMPLOYEE = { name: "", email: "", phone: "", role: EMPLOYEE_ROLES[0] };

function EmployeeFormModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial || EMPTY_EMPLOYEE);
  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }
  return (
    <Modal title={initial ? "Edit employee" : "Add employee"} onClose={onClose}>
      <form className="profile-form" onSubmit={(e) => { e.preventDefault(); onSave(form); }}>
        <label className="form-field">
          <span>Full name</span>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </label>
        <div className="profile-form__row">
          <label className="form-field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </label>
          <label className="form-field">
            <span>Phone</span>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
          </label>
        </div>
        <label className="form-field">
          <span>Role</span>
          <select value={form.role} onChange={(e) => update("role", e.target.value)}>
            {EMPLOYEE_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn--primary btn--full">Save employee</button>
      </form>
    </Modal>
  );
}

function EmployeesView({ employees, setEmployees, notify }) {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  function handleSave(form) {
    if (editing) {
      setEmployees((list) => list.map((e) => (e.id === editing.id ? { ...e, ...form } : e)));
      notify("Employee updated.");
      setEditing(null);
    } else {
      setEmployees((list) => [...list, { ...form, id: nextId() }]);
      notify("Employee added successfully.");
      setAdding(false);
    }
  }

  function handleDelete() {
    setEmployees((list) => list.filter((e) => e.id !== deleting.id));
    notify(`${deleting.name} removed.`);
    setDeleting(null);
  }

  return (
    <div className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">Employees & roles</h2>
          <p className="card__subtitle">Create and manage internal RecruitHub employees</p>
        </div>
        <button className="btn btn--primary btn--icon" onClick={() => setAdding(true)}>
          <Plus size={15} /> Add employee
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th className="table__actions-head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="table__title-cell">{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.role}</td>
              <td className="table__actions-cell">
                <button className="icon-btn" onClick={() => setEditing(emp)} aria-label="Edit"><Pencil size={15} /></button>
                <button className="icon-btn icon-btn--danger" onClick={() => setDeleting(emp)} aria-label="Delete"><Trash2 size={15} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(adding || editing) && (
        <EmployeeFormModal initial={editing} onClose={() => { setAdding(false); setEditing(null); }} onSave={handleSave} />
      )}
      {deleting && (
        <ConfirmDialog
          message={`Remove "${deleting.name}" from employees?`}
          onCancel={() => setDeleting(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

function ComposeModal({ mode, channel, group, recipients, onClose, notify }) {
  const [recipient, setRecipient] = useState(recipients[0]?.id || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSend(e) {
    e.preventDefault();
    const count = mode === "bulk" ? recipients.length : 1;
    notify(`${channel === "mail" ? "Mail" : "SMS"} sent to ${count} ${group.toLowerCase()}.`);
    onClose();
  }

  return (
    <Modal
      title={`${mode === "bulk" ? "Bulk" : "Single"} ${channel === "mail" ? "mail" : "SMS"} — ${group}`}
      subtitle={mode === "bulk" ? `This will be sent to all ${recipients.length} ${group.toLowerCase()}` : "Select a recipient"}
      onClose={onClose}
    >
      <form className="profile-form" onSubmit={handleSend}>
        {mode === "single" && (
          <label className="form-field">
            <span>Recipient</span>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} required>
              {recipients.map((r) => (
                <option key={r.id} value={r.id}>{r.name} ({r.contact})</option>
              ))}
            </select>
          </label>
        )}
        {channel === "mail" && (
          <label className="form-field">
            <span>Subject</span>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </label>
        )}
        <label className="form-field">
          <span>Message</span>
          <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <button type="submit" className="btn btn--primary btn--full">
          Send {channel === "mail" ? "mail" : "SMS"}
        </button>
      </form>
    </Modal>
  );
}

function CommunicationCenter({ channel, companies, employees, notify }) {
  const [compose, setCompose] = useState(null);

  const groups = [
    { id: "candidates", label: "Candidates", recipients: Array.from({ length: 5 }, (_, i) => ({ id: i + 1, name: `Candidate ${i + 1}`, contact: `candidate${i + 1}@mail.com` })) },
    { id: "employees", label: "Employees", recipients: employees.map((e) => ({ id: e.id, name: e.name, contact: channel === "mail" ? e.email : e.phone })) },
    { id: "companies", label: "Recruitment companies", recipients: companies.map((c) => ({ id: c.id, name: c.name, contact: channel === "mail" ? c.email : c.phone })) },
  ];

  return (
    <div className="card">
      <h2 className="card__title">{channel === "mail" ? "Mail center" : "SMS center"}</h2>
      <p className="card__subtitle">Send bulk or single {channel === "mail" ? "mail" : "SMS"} to any group</p>

      <div className="comm-entity-list">
        {groups.map((g) => (
          <div key={g.id}>
            <p className="comm-entity__label">{g.label}</p>
            <div className="comm-entity__actions">
              <button
                className="btn btn--primary"
                onClick={() => setCompose({ mode: "bulk", group: g.label, recipients: g.recipients })}
              >
                Bulk {channel === "mail" ? "Mail" : "SMS"}
              </button>
              <button
                className="btn btn--outline"
                onClick={() => setCompose({ mode: "single", group: g.label, recipients: g.recipients })}
              >
                Single {channel === "mail" ? "Mail" : "SMS"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {compose && (
        <ComposeModal
          mode={compose.mode}
          channel={channel}
          group={compose.group}
          recipients={compose.recipients}
          onClose={() => setCompose(null)}
          notify={notify}
        />
      )}
    </div>
  );
}


export default function AdminDashboard() {
  const [adminName] = useState("Admin User");
  const [activeNav, setActiveNav] = useState("dashboard");
  const navigate = useNavigate();

  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [designations, setDesignations] = useState(INITIAL_DESIGNATIONS);
  const [locations, setLocations] = useState(INITIAL_LOCATIONS);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  const [toast, setToast] = useState(null);

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(null), 2200);
  }

  function handleCompanyDecision(id, status) {
    setCompanies((list) => list.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  const pendingApprovals = useMemo(() => companies.filter((c) => c.status === "pending").length, [companies]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__brand-mark"><Briefcase size={15} /></span>
          <span className="sidebar__brand-name">RecruitHub</span>
        </div>

        <nav className="sidebar__nav">
          <button
      onClick={() => setActiveNav("dashboard")}
            className={`sidebar__link ${activeNav === "dashboard" ? "sidebar__link--active" : ""}`}
          >
            <LayoutDashboard size={16} /> Dashboard
          </button>

          {NAV_SECTIONS.map((section) => (
            <div key={section.heading} className="sidebar__section">
          <p className="sidebar__heading">{section.heading}</p>
              <div className="sidebar__group">
                {section.items.map((item) => (
                  <button
           key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={`sidebar__link ${activeNav === item.id ? "sidebar__link--active" : ""}`}
                  >
            <item.icon size={15} />
                    {item.label}
                    {item.id === "approvals" && pendingApprovals > 0 && (
                      <span className="nav-badge">{pendingApprovals}</span>
                    )}
             </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__link" onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/admin/login"); }}>
            <LogOut size={15} /> Log out
          </button>
     </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1 className="topbar__title">Administrator dashboard</h1>
       <p className="topbar__subtitle">Overview of jobs, companies and communication activity</p>
          </div>
          <div className="topbar__user">
            <span className="topbar__avatar">{adminName.charAt(0).toUpperCase() || "A"}</span>
            <span className="topbar__username">{adminName || "Admin"}</span>
       </div>
        </header>

        <div className="content">
          {activeNav === "dashboard" && (
            <DashboardView companies={companies} jobs={jobs} employees={employees} onGoTo={setActiveNav} />
       )}
          {activeNav === "approvals" && (
            <ApprovalsView companies={companies} onDecision={handleCompanyDecision} notify={notify} />
          )}
       {activeNav === "companies" && (
            <CompaniesView companies={companies} setCompanies={setCompanies} notify={notify} />
          )}
          {activeNav === "categories" && (
            <SimpleEntityView              title="Job categories" subtitle="Manage the categories jobs can be grouped under"
            icon={Tag} items={categories} setItems={setCategories} notify={notify} singularLabel="Category"
          />
          )}
          {activeNav === "dsignations" && (
            <SimpleEntityVie
              title="Job designations" subtitle="Manage available job designations"              icon={Layers} items={designations} setItems={setDesignations} notify={notify} singularLabel="Designation"
          />
        )}
        {activeNav === "locations" && (
            <SimpleEntityView
              title="Job locations" subtitle="Manage available job locations"
              icon={MapPin} items={locations} setItems={setLocations} notify={notify} singularLabel="Location"
            />
          )}
          {activeNav === "skills" && (
        <SimpleEntityView
              title="Job skills" subtitle="Manage the skills tagged to job openings"
              icon={Wrench} items={skills} setItems={setSkills} notify={notify} singularLabel="Skill"
            />
    )}
          {activeNav === "jobs" && (
            <JobsView
              jobs={jobs} setJobs={setJobs}
     companies={companies} categories={categories} designations={designations} locations={locations}
              notify={notify}
            />
          )}
          {activeNav === "employees" && (
            <EmployeesView employees={employees} setEmployees={setEmployees} notify={notify} />
   )}
          {activeNav === "mail" && (
            <CommunicationCenter channel="mail" companies={companies} employees={employees} notify={notify} />
          )}
          {activeNav === "sms" && (
          <CommunicationCenter channel="sms" companies={companies} employees={employees} notify={notify} />
          )}
        </div>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
# RecruitHub — Routing Setup

This project is wired with **react-router-dom** so buttons redirect between pages.

## Run it

```bash
npm install
npm run dev
```

## What was added / changed

- `src/main.jsx` — wraps the app in `<BrowserRouter>`
- `src/App.jsx` — renders `<AppRoutes />`
- `src/routes/AppRoutes.jsx` — maps every URL path to a page component
- `src/routes/ProtectedRoute.jsx` — blocks direct access to dashboard URLs unless `localStorage` has a `token` + matching `role` (set at login)

## Route map

| Path                    | Page                  |
|-------------------------|-----------------------|
| `/`                     | LandingPage           |
| `/admin/login`          | AdminLogin            |
| `/admin/dashboard`      | AdminDashboard (protected) |
| `/candidate/register`  | CandidateRegister     |
| `/candidate/login`     | CandidateLogin        |
| `/candidate/dashboard` | CandidateDashboard (protected) |
| `/employer/register`  | EmployerRegister (was CompanyRegister.jsx) |
| `/employer/login`     | EmployerLogin         |
| `/employer/dashboard` | EmployerDashboard (protected) |

## Button wiring

- **LandingPage**: header Login/Sign In → candidate login/register, hero "Find a job"/"Post a job" → candidate/employer register, the 3 zone cards → admin login / candidate register / employer register, footer CTA buttons → candidate register / admin login.
- **AdminLogin / CandidateLogin / EmployerLogin**: "Log In" button now calls `handleLogin`, which currently sets a demo `token` + `role` in `localStorage` and navigates to that role's dashboard. Register/forgot links point to the right pages.
- **CandidateRegister / EmployerRegister**: on submit, after the success alert, navigates to that role's login page. Top-right "Login" link now routes correctly.
- **All 3 Dashboards**: the sidebar "Log out" button clears `localStorage` and navigates back to that role's login page.

## Important — wire up real authentication next

Right now, login "succeeds" for any input because there's no backend call yet — it just sets a demo token in `localStorage`. Replace the `// TODO` blocks in `AdminLogin.jsx`, `CandidateLogin.jsx`, `EmployerLogin.jsx`, `CandidateRegister.jsx`, and `EmployerRegister.jsx` with real calls to your `services/*.js` files (`authService.js`, `candidateService.js`, `employerService.js`, `adminService.js`), and only call `navigate(...)` after a successful API response.

## Not included

`components/` (Header, Footer, Sidebar, Button, Loader) and `layouts/` (PublicLayout, CandidateLayout, EmployerLayout, AdminLayout) weren't uploaded, so they aren't wired in yet. If you want Header/Sidebar wrapping certain pages, nest routes inside a layout that renders `<Outlet />` — happy to set that up once you share those files.

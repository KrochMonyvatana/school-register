# School Register System (Learning Project)

A tiny full-stack app to learn how a React frontend talks to a Node/Express
backend, which talks to a SQLite database.

```
school-register/
├── backend/     ← Node.js + Express + SQLite (API server, port 5000)
└── frontend/    ← React + Vite + Tailwind CSS (UI, port 5173)
```

## How the pieces fit together

```
Browser (React app, http://localhost:5173)
        │  fetch("http://localhost:5000/...")
        ▼
Express server (http://localhost:5000)
        │  db.prepare(...).run() / .get() / .all()
        ▼
SQLite file: backend/school.db
```

- The **frontend** never talks to the database directly. It only ever calls
  the backend's API endpoints over HTTP using `fetch`.
- The **backend** is the only thing that touches the database. It exposes
  three endpoints: `POST /login`, `GET /students`, `POST /students`.
- `cors()` in `server.js` is what allows the browser (running on port 5173)
  to call a server on a different port (5000) without being blocked.

## 1. Install prerequisites

You need **Node.js** (v18 or newer) installed. Check with:

```bash
node -v
```

## 2. Set up and run the backend

```bash
cd backend
npm install
npm run start
```

You should see:

```
✅ Backend server running at http://localhost:5000
```

This also creates a file `backend/school.db` — that's your actual SQLite
database. You can open it with a tool like "DB Browser for SQLite" if you
want to peek inside.

Leave this terminal running.

## 3. Set up and run the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Vite will print a local URL, normally:

```
http://localhost:5173
```

Open that in your browser.

## 4. Use the app

1. Go to `http://localhost:5173`
2. Log in with:
   - username: `admin`
   - password: `1234`
3. You'll land on the Dashboard, which fetches `GET /students` from the
   backend and shows them in a table.
4. Click **"+ Add Student"**, fill in the form, and submit. This sends a
   `POST /students` request to the backend, which inserts a row into
   SQLite. You're redirected back to the dashboard, which re-fetches the
   list — your new student shows up.

## 5. Things worth exploring once it's running

- Open your browser's DevTools → Network tab, and watch the `fetch`
  requests fire as you log in / load the dashboard / add a student.
- Stop the backend server and reload the dashboard — you'll see the
  frontend's error handling kick in ("Could not load students...").
- Open `backend/school.db` in a SQLite viewer and watch rows appear as you
  add students through the UI.
- Try changing the SQL in `backend/server.js`, e.g. add a `WHERE` clause to
  filter students by class.

## Notes on the "fake" login

There's no real authentication here on purpose, to keep focus on the
frontend↔backend connection itself:

- The backend just checks if `username === "admin" && password === "1234"`.
- The frontend just stores `localStorage.setItem("loggedIn", "true")` when
  that succeeds, and checks that flag to decide whether to show the
  Dashboard or kick you back to the Login page.
- There are no passwords stored, no hashing, no tokens (JWT), and no
  sessions. In a real app you would never do it this way — but for
  learning the request/response flow, this keeps things simple.

## Possible next steps (optional, once you're comfortable)

- Add a `DELETE /students/:id` endpoint + a delete button in the UI.
- Add real password hashing (bcrypt) and a `users` table.
- Add JWT-based sessions instead of the localStorage flag.
- Add edit/update functionality for students.

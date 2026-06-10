# Jarvis

# 🏠 Jarvis — Home Manager

A personal home management app built with **FastAPI**, **Next.js**, and **PostgreSQL** — fully containerised with Docker Compose for a one-command setup.

---

## ✨ Features

- 📋 Manage household tasks, notes, and items from a clean dashboard
- ⚡ Async REST API powered by FastAPI and SQLAlchemy (asyncpg)
- 🗄️ Persistent PostgreSQL database with automatic health checks
- 🐳 Full Docker Compose setup — backend, database, and frontend all wired together
- 🔄 Live backend reloading via volume mounts during development
- 🖥️ Modern, typed frontend built with Next.js and TypeScript

---

## 🧩 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Backend   | Python, FastAPI, SQLAlchemy (async) |
| Database  | PostgreSQL 15                     |
| Frontend  | Next.js, TypeScript               |
| Styling   | CSS                               |
| Container | Docker, Docker Compose            |

---

## 📂 Project Structure

```
Jarvis/
├── backend/             # FastAPI application
│   ├── main.py          # App entry point & route definitions
│   ├── models.py        # SQLAlchemy ORM models
│   ├── schemas.py       # Pydantic request/response schemas
│   ├── database.py      # Async database connection setup
│   └── Dockerfile       # Backend container definition
├── frontend/            # Next.js application
│   ├── src/
│   │   └── app/         # App Router pages and components
│   └── Dockerfile       # Frontend container definition (optional)
├── docker-compose.yml   # Orchestrates all services
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) & Docker Compose
- Node.js 18+ *(only needed if running the frontend outside Docker)*

---

### Option 1: Run with Docker Compose (Recommended)

The easiest way to get everything running — no manual environment setup required.

**Step 1: Clone the repository**

```bash
git clone https://github.com/HudayfaOmar23/Jarvis.git
cd Jarvis
```

**Step 2: Start all services**

```bash
docker compose up --build
```

This will spin up:
- 🗄️ **PostgreSQL** on port `5432`
- ⚙️ **FastAPI backend** on port `8000`

The backend waits for the database to be healthy before starting automatically.

**Step 3: Access the API**

```
http://localhost:8000
```

Interactive API docs (Swagger UI):

```
http://localhost:8000/docs
```

---

### Option 2: Run Frontend Separately

**Step 1: Start the backend with Docker Compose**

```bash
docker compose up --build
```

**Step 2: Install frontend dependencies**

```bash
cd frontend
npm install
```

**Step 3: Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

The Docker Compose file pre-configures the following defaults for local development:

| Variable       | Default Value                                        |
|----------------|------------------------------------------------------|
| `POSTGRES_USER` | `jarvis`                                            |
| `POSTGRES_PASSWORD` | `jarvis123`                                    |
| `POSTGRES_DB`  | `jarvis`                                             |
| `DATABASE_URL` | `postgresql+asyncpg://jarvis:jarvis123@db:5432/jarvis` |

> ⚠️ For production, replace these with secure values and use a `.env` file.

---

## 🔌 API Endpoints

| Method | Endpoint | Description      |
|--------|----------|------------------|
| `GET`  | `/`      | Health check     |
| *More routes defined in `backend/main.py`* | | |

Full interactive documentation is available at `http://localhost:8000/docs` once the app is running.

---

## 🗃️ Database

PostgreSQL runs in a Docker container with a named volume (`postgres_data`) for persistence. Data survives container restarts. The backend uses **SQLAlchemy** with the **asyncpg** driver for fully async database access.

A health check (`pg_isready`) ensures the API only starts after the database is ready.

---

## 💡 What I Learned

- Building an async REST API with FastAPI and SQLAlchemy's async engine
- Structuring a full-stack project across separate `backend/` and `frontend/` directories
- Containerising a multi-service app with Docker Compose, including health checks and service dependencies
- Connecting a Next.js frontend to a FastAPI backend cleanly

---

## 🔜 Roadmap

- [x] FastAPI backend with async PostgreSQL
- [x] Docker Compose multi-service setup
- [x] Next.js TypeScript frontend scaffold
- [ ] Full CRUD for home management entities (tasks, rooms, items)
- [ ] Authentication (JWT / session-based)
- [ ] Dashboard UI with filters and status tracking
- [ ] Deploy to a cloud provider (Railway / Render / AWS)

---

## 🧙🏽‍♂️ Author

**Hudayfa Omar**

💼 [LinkedIn](https://www.linkedin.com/in/hudayfa-omar-509623298/)
💻 [GitHub](https://github.com/HudayfaOmar23)

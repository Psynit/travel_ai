# TravelEase - Online Travel Agency

A full-stack web application for booking travel packages.
**Stack**: React (Frontend) + Django (Backend) + MySQL (Database).

## Features
- **User Authentication**: Register, Login, Logout.
- **Packages**: Browse available packages with details.
- **Booking System**: Book packages and view them in dashboard.
- **Responsive UI**: Built with Bootstrap 5.

## Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL (Optional for dev, configured for SQLite by default for easy setup)

## Setup Instructions

### 1. Backend Setup (Django)

Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
pip install django django-cors-headers mysqlclient pillow
```

**Database Configuration**:
By default, the project is configured to use **SQLite** so you can run it immediately without MySQL setup.
To use **MySQL**:
1. Open `travelease_backend/settings.py`.
2. Scroll to `DATABASES`.
3. Comment out the SQLite section and uncomment the MySQL section.
4. Update `USER`, `PASSWORD` in the MySQL config.
5. Create a database named `travelease` in your MySQL server.

Run Migrations (Initialize DB):
```bash
python manage.py makemigrations
python manage.py migrate
```

Seed Data (Create sample packages):
```bash
python seed_data.py
```

Run Server:
```bash
python manage.py runserver
```
The API will be available at `http://127.0.0.1:8000/`.

### 2. Frontend Setup (React)

Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run Development Server:
```bash
npm run dev
```
Access the application at `http://localhost:5173/`.

## Project Structure

- `backend/`: Django Project.
    - `api/`: Django App containing Models, Views, URLs.
    - `travelease_backend/`: Project settings.
- `frontend/`: React Project (Vite).
    - `src/components/`: Reusable components (Navbar).
    - `src/pages/`: Application pages.
    - `src/context/`: Auth State Management.
    - `src/services/`: API configuration.

## Credentials
- You can register a new user on the website.
- Existing Admin (if created): `admin` / `admin` (You need to create superuser manually if needed: `python manage.py createsuperuser`)

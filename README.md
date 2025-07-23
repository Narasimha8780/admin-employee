# Employee Tracking Software

This project is a full-stack employee tracking system with three roles: Admin, Team Lead (TL), and Employee. It is built with Node.js (Express) for the backend, Vue.js (Vite) for the frontend, and MongoDB for data storage.

## Features
- **Role-based authentication** (Admin, TL, Employee) using JWT
- **Signup/Login** for all roles
- **Employee registration** with TL selection
- **Activity tracking**: Employees' screen and idle time
- **Dashboards**:
  - Admin: View all TLs and employees, all activity data
  - TL: View team members and their activity
  - Employee: View own activity
- **Data visualization**: Pie/bar charts and tables

## Project Structure
```
backend/   # Node.js/Express API
frontend/  # Vue.js (Vite) SPA
```

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB

### Backend Setup
```sh
cd backend
npm install
# Set up .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

### Usage
- Register as Admin, TL, or Employee
- Employees must select a TL during signup
- Login and access your dashboard
- Employees can simulate activity tracking

## License
MIT
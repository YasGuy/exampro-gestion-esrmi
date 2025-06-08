
# ExamPro Backend Setup

## Requirements
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up your MySQL database:
- Create a MySQL database named `exampro_db`
- Import the initial schema:
```bash
mysql -u your_username -p exampro_db < config/init-db.sql
```

4. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the database credentials in `.env`:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=exampro_db
DB_PORT=3306
JWT_SECRET=your_secure_jwt_secret
PORT=3001
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend will be available at `http://localhost:3001`

## API Endpoints

### Authentication
- POST `/api/auth/login` - User login

### Exams
- GET `/api/exams` - Get all exams
- POST `/api/exams` - Create new exam
- PUT `/api/exams/:id` - Update exam
- DELETE `/api/exams/:id` - Delete exam

### Salles
- GET `/api/salles` - Get all rooms
- POST `/api/salles` - Create new room
- PUT `/api/salles/:id` - Update room
- DELETE `/api/salles/:id` - Delete room

### Filières
- GET `/api/filieres` - Get all programs
- POST `/api/filieres` - Create new program
- PUT `/api/filieres/:id` - Update program
- DELETE `/api/filieres/:id` - Delete program

### Students
- GET `/api/students` - Get all students

### Modules
- GET `/api/modules` - Get all modules

## Default Login Credentials

- **Directeur**: admin@esrmi.ma / password
- **Enseignant**: malami@esrmi.ma / password
- **Enseignant**: fbennani@esrmi.ma / password
- **Étudiant**: ahmed.elidrissi@student.esrmi.ma / password

Note: All default passwords are "password" (hashed in the database)

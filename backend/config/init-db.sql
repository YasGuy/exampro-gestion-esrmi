
CREATE DATABASE IF NOT EXISTS exampro_db;
USE exampro_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('directeur', 'enseignant', 'etudiant', 'administrateur') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Filieres table
CREATE TABLE IF NOT EXISTS filieres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  filiere_id INT,
  student_number VARCHAR(50) UNIQUE NOT NULL,
  group_name VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (filiere_id) REFERENCES filieres(id)
);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  department VARCHAR(255),
  specialization VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Modules table
CREATE TABLE IF NOT EXISTS modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  credits INT NOT NULL,
  semester VARCHAR(10) NOT NULL,
  teacher_id INT,
  filiere_id INT,
  description TEXT,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id),
  FOREIGN KEY (filiere_id) REFERENCES filieres(id)
);

-- Salles table
CREATE TABLE IF NOT EXISTS salles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  capacity INT NOT NULL,
  type ENUM('Amphithéâtre', 'Salle de cours', 'Laboratoire', 'Salle informatique') NOT NULL,
  equipment TEXT,
  status ENUM('Disponible', 'Occupée', 'Maintenance') DEFAULT 'Disponible',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  salle_id INT,
  type ENUM('Examen Final', 'Rattrapage', 'Contrôle') NOT NULL,
  status ENUM('Programmé', 'Confirmé', 'En attente', 'Terminé') DEFAULT 'En attente',
  students_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id),
  FOREIGN KEY (salle_id) REFERENCES salles(id)
);

-- Grades table
CREATE TABLE IF NOT EXISTS grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  exam_id INT,
  grade DECIMAL(4,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);

-- Insert sample data
INSERT INTO filieres (name, code, description) VALUES
('Génie Informatique', 'GI', 'Formation en informatique et génie logiciel'),
('Management', 'MG', 'Formation en gestion et management'),
('Commerce', 'COM', 'Formation en commerce et marketing');

INSERT INTO users (name, email, password, role) VALUES
('Admin ESRmi', 'admin@esrmi.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'directeur'),
('Dr. Mohamed Alami', 'malami@esrmi.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant'),
('Prof. Fatima Bennani', 'fbennani@esrmi.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'enseignant'),
('Ahmed El Idrissi', 'ahmed.elidrissi@student.esrmi.ma', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'etudiant');

INSERT INTO salles (name, capacity, type, equipment, status) VALUES
('A201', 50, 'Salle de cours', 'Projecteur, Tableau intelligent', 'Disponible'),
('A202', 45, 'Salle de cours', 'Projecteur, Écran', 'Disponible'),
('B105', 60, 'Amphithéâtre', 'Sonorisation, Projecteur, Écran géant', 'Disponible'),
('C302', 30, 'Laboratoire', 'Ordinateurs, Projecteur', 'Disponible'),
('D101', 80, 'Amphithéâtre', 'Sonorisation complète, 2 projecteurs', 'Maintenance');

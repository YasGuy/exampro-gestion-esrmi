
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');
const salleRoutes = require('./routes/salles');
const studentRoutes = require('./routes/students');
const moduleRoutes = require('./routes/modules');
const filiereRoutes = require('./routes/filieres');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/salles', salleRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/filieres', filiereRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ExamPro Backend is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

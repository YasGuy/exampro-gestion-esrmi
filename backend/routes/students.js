
const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const [students] = await db.execute(`
      SELECT s.*, u.name, u.email, f.name as filiere_name, f.code as filiere_code
      FROM students s
      LEFT JOIN users u ON s.user_id = u.id
      LEFT JOIN filieres f ON s.filiere_id = f.id
      ORDER BY u.name ASC
    `);
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des étudiants' });
  }
});

module.exports = router;

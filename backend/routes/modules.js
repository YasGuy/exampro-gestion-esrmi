
const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all modules
router.get('/', async (req, res) => {
  try {
    const [modules] = await db.execute(`
      SELECT m.*, u.name as teacher_name, f.name as filiere_name
      FROM modules m
      LEFT JOIN teachers t ON m.teacher_id = t.id
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN filieres f ON m.filiere_id = f.id
      ORDER BY m.name ASC
    `);
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des modules' });
  }
});

module.exports = router;

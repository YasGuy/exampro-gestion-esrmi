
const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all exams
router.get('/', async (req, res) => {
  try {
    const [exams] = await db.execute(`
      SELECT e.*, m.name as module_name, m.code as module_code, 
             s.name as salle_name, u.name as teacher_name
      FROM exams e
      LEFT JOIN modules m ON e.module_id = m.id
      LEFT JOIN salles s ON e.salle_id = s.id
      LEFT JOIN teachers t ON m.teacher_id = t.id
      LEFT JOIN users u ON t.user_id = u.id
      ORDER BY e.date ASC
    `);
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des examens' });
  }
});

// Create exam
router.post('/', async (req, res) => {
  try {
    const { module_id, date, start_time, end_time, salle_id, type, students_count } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO exams (module_id, date, start_time, end_time, salle_id, type, students_count) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [module_id, date, start_time, end_time, salle_id, type, students_count]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Examen créé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'examen' });
  }
});

// Update exam
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { module_id, date, start_time, end_time, salle_id, type, students_count, status } = req.body;
    
    await db.execute(
      'UPDATE exams SET module_id = ?, date = ?, start_time = ?, end_time = ?, salle_id = ?, type = ?, students_count = ?, status = ? WHERE id = ?',
      [module_id, date, start_time, end_time, salle_id, type, students_count, status, id]
    );
    
    res.json({ message: 'Examen mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'examen' });
  }
});

// Delete exam
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM exams WHERE id = ?', [id]);
    res.json({ message: 'Examen supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'examen' });
  }
});

module.exports = router;

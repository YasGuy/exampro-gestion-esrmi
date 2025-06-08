
const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all salles
router.get('/', async (req, res) => {
  try {
    const [salles] = await db.execute('SELECT * FROM salles ORDER BY name ASC');
    res.json(salles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des salles' });
  }
});

// Create salle
router.post('/', async (req, res) => {
  try {
    const { name, capacity, type, equipment } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO salles (name, capacity, type, equipment) VALUES (?, ?, ?, ?)',
      [name, capacity, type, equipment]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Salle créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la salle' });
  }
});

// Update salle
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, capacity, type, equipment, status } = req.body;
    
    await db.execute(
      'UPDATE salles SET name = ?, capacity = ?, type = ?, equipment = ?, status = ? WHERE id = ?',
      [name, capacity, type, equipment, status, id]
    );
    
    res.json({ message: 'Salle mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la salle' });
  }
});

// Delete salle
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM salles WHERE id = ?', [id]);
    res.json({ message: 'Salle supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la salle' });
  }
});

module.exports = router;

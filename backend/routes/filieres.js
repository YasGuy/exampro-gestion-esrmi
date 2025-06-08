
const express = require('express');
const db = require('../config/database');

const router = express.Router();

// Get all filieres
router.get('/', async (req, res) => {
  try {
    const [filieres] = await db.execute('SELECT * FROM filieres ORDER BY name ASC');
    res.json(filieres);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des filières' });
  }
});

// Create filiere
router.post('/', async (req, res) => {
  try {
    const { name, code, description } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO filieres (name, code, description) VALUES (?, ?, ?)',
      [name, code, description]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Filière créée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la filière' });
  }
});

// Update filiere
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;
    
    await db.execute(
      'UPDATE filieres SET name = ?, code = ?, description = ? WHERE id = ?',
      [name, code, description, id]
    );
    
    res.json({ message: 'Filière mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la filière' });
  }
});

// Delete filiere
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM filieres WHERE id = ?', [id]);
    res.json({ message: 'Filière supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la filière' });
  }
});

module.exports = router;

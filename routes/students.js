const express = require("express");
const router = express.Routes();



// Get all students
app.get('/students', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM students');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get a specific student by ID
  app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [rows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Add a new student
  app.post('/students', async (req, res) => {
    const { name, email, address } = req.body;
  
    try {
      const result = await pool.query('INSERT INTO students (name, email, address) VALUES (?, ?, ?)', [name, email, address]);
      res.status(201).json({ message: 'Student created', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Update an existing student
  app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, address } = req.body;
  
    try {
      const result = await pool.query('UPDATE students SET name = ?, email = ?, address = ? WHERE id = ?', [name, email, address, id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student updated', id: parseInt(id) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Delete a student by ID
  app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM students WHERE id = ?', [id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json({ message: 'Student deleted', id: parseInt(id) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
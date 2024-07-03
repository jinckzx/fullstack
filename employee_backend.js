const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 2222;

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'password',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static HTML files (assuming index.html is in the root directory)
app.use(express.static(path.join(__dirname)));

// API routes

// GET employee details by ID
app.get('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'SELECT * FROM employees WHERE employee_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ error: 'Error fetching employee details' });
  }
});

// POST create new employee
app.post('/employees', async (req, res) => {
  try {
    const { employee_id, first_name, age, hire_date, positions, password } = req.body;

    const query = `
      INSERT INTO employees (employee_id, first_name, age, hire_date, positions, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;`;

    const values = [employee_id, first_name, age, hire_date, positions, password];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting employee:', error);
    res.status(500).json({ error: 'Error inserting employee' });
  }
});

// DELETE employee by ID
app.delete('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM employees WHERE employee_id = $1';
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json({ message: 'Employee deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

// PUT update employee by ID
app.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, age, hire_date, positions, password } = req.body;

    const query = `
      UPDATE employees 
      SET first_name = $1, age = $2, hire_date = $3, positions = $4, password = $5
      WHERE employee_id = $6
      RETURNING *;`;

    const values = [first_name, age, hire_date, positions, password, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

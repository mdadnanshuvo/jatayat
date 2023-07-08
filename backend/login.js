const express = require('express');
const mysql = require('mysql');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'jatayat'
});

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Route for handling login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Authentication successful
    return res.status(200).json({ message: 'Login successful' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

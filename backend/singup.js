const express = require('express');
const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jatayat'
});

const app = express();


app.use(express.json());


app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  
  pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    
    pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (error) => {
      if (error) {
        console.error('Error executing the query:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      return res.status(201).json({ message: 'User created successfully' });
    });
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  
  pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    return res.status(200).json({ message: 'Login successful' });
  });
});

/
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

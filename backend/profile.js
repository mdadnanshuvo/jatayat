
app.get('/profile/:userId', (req, res) => {
  const userId = req.params.userId;

  
  pool.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = results[0];

    
    return res.status(200).json(userProfile);
  });
});

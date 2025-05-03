const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'prikahn-solutions/build')));

// Serve index.html on all unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'prikahn-solutions/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression and security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'prikahn-solutions/build'), {
  maxAge: '1d', // Cache static files for 1 day
  etag: true
}));

// Serve index.html on all unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'prikahn-solutions/build', 'index.html'), {
    maxAge: '1d',
    etag: true
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, 'prikahn-solutions/build')}`);
});

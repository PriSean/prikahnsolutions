const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable compression and security headers
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app build folder
const staticPath = path.join(__dirname, 'prikahn-solutions/build');
app.use(express.static(staticPath, {
  maxAge: '1d',
  etag: true
}));

// Serve index.html on all unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${staticPath}`);
});

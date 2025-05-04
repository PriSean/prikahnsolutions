const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const fs = require('fs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for development
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
const staticPath = path.join(__dirname, 'prikahn-solutions/build');
console.log('Static path:', staticPath);

// Verify build directory exists
if (!fs.existsSync(staticPath)) {
  console.error('Build directory not found:', staticPath);
  console.error('Please run npm run build first');
  process.exit(1);
}

// Log build directory contents for debugging
console.log('Build directory contents:', fs.readdirSync(staticPath));

// Serve static files
app.use(express.static(staticPath, {
  maxAge: '1d',
  etag: true,
  index: false
}));

// Serve index.html for all routes (for React Router)
app.get('*', (req, res) => {
  const indexPath = path.join(staticPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('index.html not found in build directory');
    return res.status(500).send('index.html not found');
  }
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${staticPath}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, 'prikahn-solutions/build')));

// Serve index.html on all unknown routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'prikahn-solutions/build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

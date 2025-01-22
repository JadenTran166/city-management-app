const path = require('path');
const port = 5000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

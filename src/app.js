const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes');

require('dotenv').config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects', projectRoutes);

app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;

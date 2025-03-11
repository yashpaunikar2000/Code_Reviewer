const express = require('express');
const aiRoutes = require('./Routes/ai.routes');
const cors = require('cors');

const app = express();

// Fix CORS issue
app.use(cors({
    origin: ['http://localhost:5175'], // Allow both local and deployed frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true // Allow credentials
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRoutes);

module.exports = app;

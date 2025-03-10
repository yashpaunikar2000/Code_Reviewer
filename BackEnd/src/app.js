const express = require('express');
const aiRoutes = require('./Routes/ai.routes');
const cors = require('cors');

const app = express();

// Fix CORS issue
app.use(cors({
    origin: 'https://code-reviewer-frontend-three.vercel.app', // Allow frontend origin
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Added OPTIONS method
    allowedHeaders: 'Content-Type,Authorization'
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/ai', aiRoutes);

module.exports = app;

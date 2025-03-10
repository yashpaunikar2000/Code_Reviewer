const express=require('express');
const aiRoutes = require('./Routes/ai.routes')
const cors=require('cors')
const app=express()
app.use(cors({
    origin: 'https://code-reviewer-frontend-three.vercel.app', // Specific frontend origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/ai',aiRoutes)

module.exports = app;
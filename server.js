const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// reference: Module 11 Activity 2 Student Setup
const PORT = 3001

// middleware to parse data
// reference: "How do I consume the JSON POST data in an Express application" Stack Overflow: https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application

app.use(express.json());

// pulls files from public folder
// reference: "Serving static files in Express" Express: https://expressjs.com/en/starter/static-files.html
app.use(express.static(path.join(__dirname, 'public')));

// edited get methods to define the routes for the landing/notes page
// reference: Module 11 Activty 4: API HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

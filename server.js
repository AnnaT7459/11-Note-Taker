const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require ('./db/db')

const app = express();

// reference: Module 11 Activity 2 Student Setup
const PORT = 3001;

// Middleware for parsing application/json and urlencoded data (MODULE 11 - INSTRUCTOR CODE 15)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// pulls files from public folder
// reference: "Serving static files in Express" Express: https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// edited get methods to define the routes for the landing/notes page
// reference: Module 11 Activty 4: API HTML routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
  });
  
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });



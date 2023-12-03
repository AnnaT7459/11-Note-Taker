const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// reference: Module 11 Activity 2 Student Setup
const PORT = 3001

// middleware to parse data
// reference: "How do I consume the JSON POST data in an Express application" Stack Overflow: https://stackoverflow.com/questions/10005939/how-do-i-consume-the-json-post-data-in-an-express-application

app.use(express.json());
app.use('/api', api);

// pulls files from public folder
// reference: "Serving static files in Express" Express: https://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// uses express to get notes from the API and syncs them
// reference: Module 11 Student Mini Project, "Callback API" Node.js: https://nodejs.org/api/fs.html
app.get('/api/notes', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'db', 'db.json'))));
  });
  
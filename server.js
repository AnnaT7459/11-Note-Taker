const express = require('express');
const path = require('path');
const notes = require('./db/notes');
// generates unique ids
const uuid = require('./helpers/uuid')

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

app.get('/api/notes', (req, res) => {
    res.status(200).json(notes);
});

//   post request to add a note
app.post('/api/notes', (req, res) => {
    // log that post was received
    console.info(`${req.method} request received to add a note`);

    // destructure for items in req.body
    const { title, text } = req.body;

    // if note title and text are/are not entered:
    if (title && text) {
        const newNote = {
            title,
            text,
            review_id: uuid(),
        };

        const userNote = {
            status: 'success',
            body: newNote,
        };
        console.log(userNote);
        // reference: "HTTP response status codes" mdm web docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        // 201 = 'created'
        res.status(201).json(userNote);
    } else {
        // 500 = internal server error
        res.status(500).json('Error adding note')
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

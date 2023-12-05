const express = require('express');
const path = require('path');
const fs = require('fs');
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
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            // Convert string into JSON object
            const parsedNotes = JSON.parse(data);
            res.status(200).json(parsedNotes);
        }
    });
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
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                // Convert string into JSON object
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err, data) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(201).json(newNote);
                    }
                });
            }
        });
    } else {
        // bad request = 400
        res.status(400).json('Enter a title and text for your note');
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

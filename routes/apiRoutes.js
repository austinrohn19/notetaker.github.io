const note = require ("express").Router();
const {readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4 : uuidv4 } = require("uuid");

// GET request
note.get('/notes', (req, res) => {
  // Let the client know that their request was received
  console.info(`${req.method} note received`);

  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST request
note.post('/notes', (req, res) => {
  // Let the client know that their POST request was received
  console.info(`${req.method} not recieved and sumbited to notes`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/notes.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }

});

note.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((notes) => notes.id !==noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/notes.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
  
module.exports = note;


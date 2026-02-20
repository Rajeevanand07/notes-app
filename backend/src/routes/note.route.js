const express = require('express');
const {getAllNotes, createNote, updateNotes, deleteNote} = require('../controllers/note.controller')
const router = express.Router(); // iski help se hum apne route ko organize karte hain
const userAuth = require('../middleware/auth.middleware')

router.get('/', userAuth, getAllNotes );
router.post('/',userAuth, createNote);
router.put('/:id', userAuth, updateNotes);
router.delete('/:id', userAuth, deleteNote);

module.exports = router;
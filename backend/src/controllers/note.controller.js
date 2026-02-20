const NoteModel = require('../models/note.model');

async function getAllNotes(req,res){
    const user = req.user
    console.log("user",user);
    
    const notes = await NoteModel.find({userId : user.id});
    console.log("notes", notes);
    
    res.json(notes);
}

async function createNote(req,res){
    const user = req.user
    const { title, content } = req.body;
    const note = await NoteModel.create({ title, content ,userId: user.id });
    res.status(201).json(note);
}

async function updateNotes(req, res){
    const { id } = req.params;
    const { title, content } = req.body;
    const note = await NoteModel.findByIdAndUpdate(id, { title, content }, { new: true });
    res.json(note);
}

async function deleteNote(req, res){
    const { id } = req.params;
    const note = await NoteModel.findByIdAndDelete(id);
    res.json(note);
}

module.exports = {
    getAllNotes,
    createNote,
    updateNotes,
    deleteNote
}
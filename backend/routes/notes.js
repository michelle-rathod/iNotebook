const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//--------------------------- ROUTE-1 --------------------------- 
// Get all notes GET "/notes/fetchallnotes"

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }
})

//--------------------------- ROUTE-2 --------------------------- 
//Add a new note POST "/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', "Title must be atleast 3 characters").isLength({ min: 3 }),
    body('description', "Description must be atleast 3 characters").isLength({ min: 6 })
], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        //if there are any errors or bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }
})


//--------------------------- ROUTE-3 --------------------------- 
//Update an exksting note PUT "/notes/updatenote"
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        // Create a new note
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }

})

//--------------------------- ROUTE-4 --------------------------- 
//Delete an existing note DELETE "/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        // Find note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found")
        }

        // Allow deletion only if the user owns that note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Access Denied")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":" Note is deleted", note:note});

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }

})

module.exports = router;
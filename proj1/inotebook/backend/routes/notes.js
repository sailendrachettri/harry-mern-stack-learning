const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')


// ROUTE 1: get all the notes. login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }
})
// ROUTE 2: Add notes using post. login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body

        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something went wrong :(")
    }
})

// ROUTE 3: Update notes using post. login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    // create newNote object
    const newNote = {}

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the note to be updated and update it
    let note = await Note.findById(req.params.id)

    if (!note) { return res.status(404).send("Not found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized user")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })

})
module.exports = router
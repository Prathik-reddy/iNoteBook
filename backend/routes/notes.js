const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body,validationResult
} = require('express-validator');

//Route 1: get all the notes using GET : "/api/notes/getuser"
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id
        });
        res.json(notes);
    } catch (error) {
        console.error(error.mesage);
        res.status(500).send("Internal server error occured");
    }
})
//Route 2: add a new note using POST : "/api/notes/addnote" : login req
router.post("/addnote", fetchuser, [
    body('title', "Enter a valid title").isLength({
        min: 5
    }),
    body('description', "Enter a valid description").isLength({
        min: 5
    }),
], async (req, res) => {
    try {
        const {
            title,
            description,
            tag,
        } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id

        })
        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured 5");
    }
})
// //Route 2: add a new note using Put: "/api/notes/updatenote" : login req
router.put("/updatenote/:id", fetchuser,async (req, res) => {
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note to be update and update it
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not Found");
    }
    if(note.user.toString()!== req.user.id){
        return res.status(401).send("Not allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});
     })
module.exports = router;
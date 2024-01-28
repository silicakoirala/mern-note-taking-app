const express = require("express");
const notesController = require("../controllers/notesController");

const router = express.Router();

router.get('/', notesController.fetchNotes);
router.get('/:id', notesController.fetchNote);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
import express from "express";
const router = express.Router();
import * as Models from '../models/notes.model'

router.get('/all', (req, res) => {
    Models.getAllNotes(res, req);
});

router.post('/new', (req, res) => {
    Models.newNote(res,req);
});

router.get('/allByStudent', (req, res) => {
    Models.getAllNotesByStudent(res, req);
});

router.get('/allByTopic', (req, res) => {
    Models.getAllNotesByTopic(res, req);
});

router.get('/allByCohort', (req, res) => {
    Models.getAllNotesByCohort(res, req);
});

router.put('/update', (req, res) => {
    Models.updateNote(res,req);
});

router.delete('/delete', (req, res) => {
    Models.deleteNote(res,req);
});


export default router;
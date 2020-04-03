import express from "express";
const router = express.Router();
import * as Models from '../models/notes.model'

router.get('/all', (req, res) => {
    Models.getAllNotes(res, req);
});

router.post('/new', (req, res) => {
    Models.newNote(res,req);
});

router.get('/student/:id', (req, res) => {
    Models.getAllNotesByStudent(res, req);
});

router.get('/cohort/:id', (req, res) => {
    Models.getAllNotesByCohort(res, req);
});

router.post('/topic/', (req, res) => {
    Models.getAllNotesByTopic(res, req);
});

router.put('/update', (req, res) => {
    Models.updateNote(res,req);
});

router.delete('/delete/:id', (req, res) => {
    Models.deleteNote(res,req);
});


export default router;
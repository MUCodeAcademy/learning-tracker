import express from "express";
const router = express.Router();
import * as Models from '../models/questions.model'

router.get('/all', (req, res, next)=>{
    Models.getAllQuestions(res, req);
});

router.get('/student/:id', (req, res, next)=>{
    Models.getQuestionsByStudent(res, req);
});

router.get('/topic/:id', (req, res, next)=>{
    Models.getQuestionsByTopic(res, req);
});

router.get('/cohort/:id', (req, res, next)=>{
    Models.getQuestionsByCohort(res, req);
});

router.post('/new', (req, res, next)=>{
    Models.addNewQuestion(res, req)
});

router.put('/edit', (req, res, next)=>{
    Models.editQuestion(res,req)
});

router.delete('/delete/:id', (req, res, next)=>{
    Models.deleteQuestion(res,req)
});

export default router;
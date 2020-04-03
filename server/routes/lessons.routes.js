import express from "express";
const router = express.Router();
import * as Models from '../models/lesson.model'

router.get('/all', (req, res)=>{
    Models.getAllLessons(res,req)
});

router.post('/new', (req, res)=>{
    Models.postLesson(res,req)
    });

router.delete('/delete/:id', (req, res)=>{
    Models.deleteLesson(res,req)
    });

router.put('/edit', (req, res)=>{
    Models.updateLesson(res,req)
    });



export default router;
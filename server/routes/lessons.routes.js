import express from "express";
const router = express.Router();

router.get('/getCohort', (req, res)=>{
res.send("working");
});

router.add('/addLesson', (req, res)=>{
    res.send("working");
    });

router.delete('/deleteLesson', (req, res)=>{
    res.send("working");
    });

router.put('/editLesson', (req, res)=>{
    res.send("working");
    });



export default router;
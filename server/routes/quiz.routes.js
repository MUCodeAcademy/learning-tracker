import express from "express";
const router = express.Router();

router.add('/addQuiz', (req, res)=>{
    res.send("working");
});

router.put('/editQuiz', (req, res)=>{
    res.send("working");
});

router.delete('/deleteQuiz', (req, res)=>{
    res.send("working");
});

router.get('/getQuiz', (req, res)=>{
    res.send("working");
}); 


export default router;
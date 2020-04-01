import express from "express";
const router = express.Router();

router.get('/getQuestions', (req, res, next)=>{
    res.send("working");
});

router.get('/getUser', (req, res, next)=>{
    res.send("working");
});

router.update('/updateQuestions', (req, res, next)=>{
    res.send("working")
});

router.pull('/pullQuestions', (req, res, next)=>{
    res.send("working");
});

router.put('/editQuestions', (req, res, next)=>{
    res.send("working");
});

router.add('/addQuestion', (req, res, next)=>{
    res.send("working");
});

router.delete('/deleteQuestion', (req, res, next)=>{
    res.send("working");
});

router.add('/addComment', (req, res, next)=>{
    res.send("working");
});


export default router;
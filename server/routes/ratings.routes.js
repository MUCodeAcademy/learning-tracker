import express from "express";
const router = express.Router();

router.get('/getUser', (req, res, next)=>{
res.send("working");
});

router.get('/getCohort', (req, res, next)=>{
    res.send("working");
    });

router.get('/getAll', (req, res, next)=>{
res.send("working");
});

router.post('/createStudent', (req, res, next)=>{
    res.send("working");
    });

router.put('/updateStudent', (req, res, next)=>{
res.send("working");
});


export default router;
import express from "express";
const router = express.Router();

router.get('/userRatings', (req, res, next)=>{
res.send("working");
});

router.get('/cohortRatings', (req, res, next)=>{
    res.send("working");
    });

router.get('/allRatings', (req, res, next)=>{
res.send("working");
});

router.post('/studentRating', (req, res, next)=>{
    res.send("working");
    });

router.put('/updateStudentRating', (req, res, next)=>{
res.send("working");
});


export default router;
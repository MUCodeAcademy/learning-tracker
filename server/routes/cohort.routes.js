import express from "express";
const router = express.Router();
import * as Models from '../models/cohort.model'

router.get('/all', (req, res) => {
    Models.getAllCohorts(res, req);
});

router.post('/new', (req, res) => {
    Models.newCohort(res,req);
});

router.delete('/delete', (req, res) => {
    Models.deleteCohort(res,req);
});

router.put('/update', (req, res) => {
    Models.updateCohort(res,req);
});



export default router;
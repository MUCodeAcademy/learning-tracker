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

router.post('/assign', (req, res) => {
    Models.assignStudentCohort(res,req);
});

router.delete('/remove', (req, res) => {
    Models.deleteStudentCohort(res,req);
});

router.put('/change', (req, res) => {
    Models.updateStudentCohort(res,req);
});

export default router;
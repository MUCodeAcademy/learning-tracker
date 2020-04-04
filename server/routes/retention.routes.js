import express from "express";
const router = express.Router();
import * as Models from '../models/retention.model'

router.get('/all', (req, res) => {
    Models.getAllRetention(res, req);
});

router.post('/new', (req, res) => {
    Models.newRetention(res,req);
});

router.get('/student/:id', (req, res) => {
    Models.getAllRetentionByStudent(res, req);
});

router.get('/cohort/:id', (req, res) => {
    Models.getAllRetentionByCohort(res, req);
});

router.post('/topic/', (req, res) => {
    Models.getAllRetentionByTopic(res, req);
});

router.put('/update', (req, res) => {
    Models.updateRetention(res,req);
});

router.delete('/delete/:id', (req, res) => {
    Models.deleteRetention(res,req);
});

export default router;
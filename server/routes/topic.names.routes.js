import express from "express";
const router = express.Router();
import * as Models from '../models/topic.names.model'

router.get('/all', (req, res) => {
    Models.getAllTopics(res, req);
});

router.delete('/delete/:id', (req, res) => {
    Models.deleteTopic(res,req);
});

router.post('/new', (req, res) => {
    Models.addTopic(res,req);
});

export default router;
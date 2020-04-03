import express from "express";
const router = express.Router();
import * as Models from '../models/user.model'

router.get('/all', (req, res) =>{
    Models.getAllUsers(res, req);
});

router.get('/students', (req, res) =>{
    Models.getAllStudents(res, req);
});

router.get('/students/:cohortid', (req, res) =>{
    Models.getAllUsers(res, req);
});
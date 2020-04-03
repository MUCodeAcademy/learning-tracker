import express from "express";
const router = express.Router();
import * as Models from '../models/user.model'

router.get('/all', (req, res) =>{
    Models.getAllUsers(res, req);
});

router.get('/students', (req, res) =>{
    
    Models.getAllStudents(res, req);
});

router.get('/students/cohort/:id', (req, res) =>{
    Models.getAllStudentsbyCohort(res, req);
});

router.get('/instructors', (req, res) =>{
    Models.getAllInstructors(res, req);
});

router.get('/instructors/cohort/:id', (req, res) =>{
    Models.getAllInstructorsbyCohort(res, req);
});

router.get('/admin', (req, res) =>{
    Models.getAllAdmin(res, req);
});

router.delete('/remove/:id', (req, res) =>{
    Models.deleteUser(res, req)
});

router.put('/edit', (req, res) =>{
    Models.editUser(res, req)
});

router.get('/userinfo', (req, res) =>{
    Models.getUserInfo(res, req)
});

router.get('/activate', (req, res) =>{
    Models.activateUser(res, req)
});


export default router;

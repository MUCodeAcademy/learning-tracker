const { client, pool } = require('../config/postgres.conf')


function getAllUsers(response, request) {
    pool.query("SELECT * FROM users").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No users found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function getAllStudents(response, request) {
    pool.query("SELECT * FROM users JOIN role ON user.role_id = role.id WHERE role.id = 3").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No students found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function getAllStudentsbyCohort(response, request) {
    let name = [request.name]
    pool.query("SELECT * FROM user JOIN role ON user.role_id = role.id JOIN cohort_to_student ON user.id = cohort_to_student.user_id JOIN cohort ON cohort_to_student.cohort_id = cohort.id WHERE cohort_name = $1 AND role.id = 3"), name.then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No students found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function getAllInstructors(response, request) {
    pool.query("SELECT * FROM users JOIN role ON user.role_id = role.id WHERE role.id = 2").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No instructors found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function getAllInstructorsbyCohort(response, request) {
    let name = [request.name]
    pool.query("SELECT * FROM user JOIN role ON user.role_id = role.id JOIN cohort_to_student ON user.id = cohort_to_student.user_id JOIN cohort ON cohort_to_student.cohort_id = cohort.id WHERE cohort_name = $1 AND role.id = 2"), name.then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No instructors found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function getAllAdmin(response, request) {
    pool.query("SELECT * FROM users JOIN role ON user.role_id = role.id WHERE role.id = 1").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No admin found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function deleteUser(response, request) {
    let id = [request.id];
    pool.query("DELETE FROM cohorts WHERE user.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User deleted." })
    })
}

function editUserRole(response, request) {
    let newRole = [request.role]
    let id = [request.id]
    pool.query("UPDATE user SET user.role_id = $1 WHERE user.id = $2", newRole, id, (err, result, field) =>{
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User role updated." })
    })
}

function editUser(response, request) {
    let email = [request.email]
    let firstName = [request.first]
    let lastName = [request.last]
    let id = [request.id]
    pool.query("UPDATE user SET user.email_address = $1, user.first_name = $2, user.last_name = $3 WHERE user.id = $4", email, firstName, lastName, id, (err, result, field) =>{
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User updated." })
    })
}







module.exports.getAllUsers = getAllUsers
module.exports.getAllStudents = getAllStudents
module.exports.getAllStudentsbyCohort = getAllStudentsbyCohort
module.exports.getAllInstructors = getAllInstructors
module.exports.getAllInstructorsbyCohort = getAllInstructorsbyCohort
module.exports.deleteUser = deleteUser
module.exports.getAllAdmin = getAllAdmin
module.exports.editUserRole = editUserRole
module.exports.editUser = editUser

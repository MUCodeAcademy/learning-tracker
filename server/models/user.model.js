import { client, pool } from '../config/postgres.conf'


export function getAllUsers(response, request) {
    pool.query("SELECT * FROM users").then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No users found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllStudents(response, request) {
    pool.query("SELECT * FROM users WHERE role.id = 3").then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No students found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllStudentsbyCohort(response, request) {
    let id = [request.params.id]
    pool.query("SELECT * FROM user JOIN cohort_to_student ON user.id = cohort_to_student.user_id JOIN cohort ON cohort_to_student.cohort_id = cohort.id WHERE cohort_id = $1 AND role.id = 3"), id.then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No students found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllInstructors(response, request) {
    pool.query("SELECT * FROM users WHERE role.id = 2").then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No instructors found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllInstructorsbyCohort(response, request) {
    let id = [request.params.id]
    pool.query("SELECT * FROM user JOIN cohort ON user.id = cohort.instructor_id WHERE cohort.id = $1"), id.then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No instructors found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllAdmin(response, request) {
    pool.query("SELECT * FROM users WHERE role.id = 1").then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No admin found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function deleteUser(response, request) {
    let id = [request.body.id];
    pool.query("DELETE FROM cohorts WHERE user.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User deleted." })
    })
}

export function editUserRole(response, request) {
    let change = [request.body.role, request.body.id]
    pool.query("UPDATE user SET user.role_id = $1 WHERE user.id = $2", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User role updated." })
    })
}

export function editUser(response, request) {
    let user =  [request.body.email, request.body.first, request.body.last, request.body.roleId, request.body.id]
    pool.query("UPDATE user SET user.email_address = $1, user.first_name = $2, user.last_name = $3, user.role_id = $4 WHERE user.id = $5", user, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User updated." })
    })
}

export function getUserInfo(response, request) {
    let email = [request.body.email]
    let user = [request.body.email, request.body.first, request.body.last]
    pool.query('SELECT * FROM user WHERE user.email = $1', email, (err, results) => {
        if (err) {
            return console.log("Error on query", err.stack)
        }
        if (rows.length > 0) {
            return response.send({ success: true, msg: "Signed in successfully", data: response.rows[0] })
        }
        pool.query("INSERT INTO user (id, email_address, first_name, last_name, role_id) VALUES (DEFAULT, $1, $2, $3, 4)", user, (err, results) => {
            if (err) {
                return response.send({ success: false, err: err });
            }
            pool.query("SELECT * FROM users WHERE user.email_address = $1", email).then(res => {
                return res.send({ success: true, msg: "Data retrieved.", data: res.rows[0] })
            })
                .catch(err => console.log(err))
        })
    })
}

export function activateUser(response, request) {
    let data = [request.body.userId, request.body.cohortId]
    pool.query("SELECT data FROM user_activate($1)", id).then(res => {
        return res.send({ success: true, msg: "Data retrieved.", data: res.rows[0] })
    })
        .catch(err => console.log(err))
}


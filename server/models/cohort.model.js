import { pool } from '../config/postgres.conf'


export function newCohort(response, request) {
    let name = [request.body.name, request.body.instructorid]
    pool.query("INSERT INTO cohort(id,cohort_name,instructor_id) VALUES (DEFAULT, $1, $2)", name, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Created New Cohort" })
    })
}

export function getAllCohorts(response, request) {
    pool.query("SELECT * FROM cohort").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No cohorts found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function updateCohort(response, request) {
    let change = [request.body.cohort_name, request.body.instructor_id, request.body.id];
    pool.query("UPDATE cohort SET cohort_name = $1, instructor_id = $2 WHERE cohort.id = $2", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort updated." })
    })
}

export function deleteCohort(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM cohort WHERE cohort.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort deleted." })
    })
}

export function assignStudentCohort(response, request) {
    let data = [request.body.cohortid, request.body.studentid]
    pool.query("INSERT INTO cohort_to_student(id,cohort_id,student_id) VALUES (DEFAULT, $1, $2)", data, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Assigned Cohort to Student" })
    })
}

export function updateStudentCohort(response, request) {
    let change = [request.body.cohortid, request.body.studentid, request.body.id];
    pool.query("UPDATE cohort_to_student SET cohort_id = $1, user_id = $2 WHERE cohort_to_student.id = $3", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort to Student updated." })
    })
}

export function deleteStudentCohort(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM cohort_to_student WHERE cohort_to_student.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort to Student deleted." })
    })
}

export function getAllEnrollment(response, request) {
    pool.query("select data from user_get_all_in_cohorts()").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No cohorts found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}


export function getStudentEnrollment(response, request) {
    let id = [request.params.id]
    pool.query("select data from user_get_cohorts_by_user_id($1)", id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No enrollments found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}
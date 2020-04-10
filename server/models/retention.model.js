import { client, pool } from '../config/postgres.conf'

export function getAllRetention(response, request) {
    pool.query("SELECT * FROM topic_retention").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No retention data found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function newRetention(response, request) {
    let data = [request.body.user_id, request.body.lesson_id, request.body.topic_id, request.body.instructor_id, request.body.student_retention_rating, request.body.teacher_retention_rating]
    pool.query("INSERT INTO topic_retention(id, user_id, lesson_id, topic_id, instructor_id, student_retention_rating, teacher_retention_rating) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)", data, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Created New Retention" })
    })
}

export function getAllRetentionByStudent(response, request) {
    let student_id = [request.params.id]
    pool.query("SELECT * FROM topic_retention WHERE user_id = $1", student_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No retention data found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllRetentionByCohort(response, request) {
    let cohort_id = [request.params.id]
    pool.query("SELECT data FROM retention_get_all_by_cohort_id($1)", cohort_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No retention found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllRetentionByTopic(response, request) {
    let parms = [request.body.topicid, request.body.cohortid]
    pool.query("SELECT data FROM retention_get_all_by_topic_id($1,$2)", parms).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No retention data found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function updateRetention(response, request) {
    let retention = [request.body.studentrating, request.body.teacherrating, request.body.instructorid, request.body.id]
    pool.query("UPDATE topic_retention SET student_retention_rating = $1, teacher_retention_rating = $2, instructor_id = $3 WHERE topic_retention.id = $4", retention, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Updated Retention" })
    })
}

export function deleteRetention(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM topic_retention WHERE topic_retention.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Retention deleted." })
    })
}
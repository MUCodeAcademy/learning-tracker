import {client, pool } from '../config/postgres.conf'



export function addStudentRetentionByTopic(response, request){
    let student = [request.body.topicId, request.body.studentId, request.body.lessionId, request.body.newRetention]
    pool.query("INSERT INTO topic_retention (id, student_id, lesson_id, instructor_id, student_retention_rating, teacher_retention_rating, topic_id) VALUES (DEFAULT, $1, $2, DEFAULT, $3, DEFAULT, $4)", student, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err });
        } 
        else return response.send({ success: true, msg: "Data retrieved." })
     } )
}

export function addInstructorRetentionByTopic(response, request){
    let instructor = [request.body.topicId, request.body.instructorId, request.body.lessionId, request.body.newRetention]
    pool.query("INSERT INTO topic_retention (id, student_id, lesson_id, instructor_id, student_retention_rating, teacher_retention_rating, topic_id) VALUES (DEFAULT, DEFAULT, $1, $2, DEFAULT, $3, $4)", instructor, (err, results) => {
        if (err) {
            return res.send({ success: false, err: err });
        } 
        else return response.send({ success: true, msg: "Data retrieved." })
     } )
}

export function getAllRatingsByTopic(response, request){
    let studentId = [request.body.studentId]
    pool.query("SELECT * FROM topic_retention WHERE topic_retention.student.id = $1"), studentId.then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllRatingsByStudent(response, request){
    let studentId = [request.body.studentId]
    pool.query("SELECT * FROM topic_retention WHERE topic_retention.student.id = $1"), studentId.then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
    
}

export function editStudentRetentionByTopic(response, request){
    let newStudentRetention = [request.body.topicId, request.body.id, request.body.newRetention]
    pool.query("UPDATE topic_retention SET topic_retention.student_retention = $1 WHERE topic_retention.student_id = $2 AND topic_retention.topic_id = $3", newStudentRetention, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Retention updated." })
    })
}

export function editInstructorRetentionByTopic(response, request){
    let newInstructorRetention = [request.body.topicId, request.body.id, request.body.newRetention]
    pool.query("UPDATE topic_retention SET topic_retention.teacher_retention = $1 WHERE topic_retention.instructor_id = $2 AND topic_retention.topic_id = $3", newInstructorRetention, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Retention updated." })
    })
}


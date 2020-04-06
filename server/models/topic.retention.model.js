import { pool } from '../config/postgres.conf'



export function addStudentRetentionByTopic(response, request){
    let data = [request.body.studentid, request.body.lessonid, request.body.studentretention, request.body.topicid]
    pool.query("INSERT INTO topic_retention (id, student_id, lesson_id, instructor_id, student_retention_rating, teacher_retention_rating, topic_id) VALUES (DEFAULT, $1, $2, DEFAULT, $3, DEFAULT, $4)", data, (err, results) => {
        if (err) {
            return response.send({ success: false, err: err });
        } 
        else return response.send({ success: true, msg: "Data retrieved." })
     } )
}

export function addInstructorRetentionByTopic(response, request){
    let data = [request.body.instructorid, request.body.lessonid, request.body.studentretention, request.body.topicid]
    pool.query("INSERT INTO topic_retention (id, student_id, lesson_id, instructor_id, student_retention_rating, teacher_retention_rating, topic_id) VALUES (DEFAULT, DEFAULT, $1, $2, DEFAULT, $3, $4)", data, (err, results) => {
        if (err) {
            return response.send({ success: false, err: err });
        } 
        else return response.send({ success: true, msg: "Entry added." })
     } )
}

export function getAllRatingsByTopic(response, request){
    let data = [request.params.id]
    pool.query("SELECT * FROM topic_retention WHERE topic_retention.topic_id = $1", data).then(res => {
        if (res.rows.length === 0) {
            return res.send({ success: false, msg: "No ratings found." })
        }
        else return res.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllRatingsByStudent(response, request){
    let data = [request.params.id]
    pool.query("SELECT * FROM topic_retention WHERE topic_retention.student.id = $1", data).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
    
}

export function editStudentRetentionByTopic(response, request){
    let data = [request.body.retention, request.body.id]
    pool.query("UPDATE topic_retention SET topic_retention.student_retention = $1 WHERE id = $2", data, (err, result, field) => {
        if (err) { return response.send({msg:"Error on query", err: err.stack}) }
        return response.send({ success: true, msg: "Retention updated." })
    })
}

export function editInstructorRetentionByTopic(response, request){
    let data = [request.body.retention, request,body.id]
    pool.query("UPDATE topic_retention SET topic_retention.teacher_retention = $1 WHERE id = $2", data, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Retention updated." })
    })
}


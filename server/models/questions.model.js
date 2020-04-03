import {client, pool } from '../config/postgres.conf'

export function addNewQuestion(response, request){
    let data = [request.body.studentid, request.body.instructorid, request.body.lessonid, request.body.text, request.body.answer]
    pool.query("INSERT INTO question (id, student_id, instructor_id, lesson_id, question_text, question_answer) VALUES (DEFAULT, $1, $2, $3, $4, $5)", data, (err, results) => {
        if (err) {
            return response.send({ success: false, err: err });
        } 
        else return response.send({ success: true, msg: "Question Added." })
     } )
}

export function editQuestion(response, request){
    let data = [request.body.text, request.body.answer, request.body.id]
    pool.query("UPDATE question SET question.question_text = $1, question.question_answer = $2 WHERE id = $3", data, (err, result, field) => {
        if (err) { return response.send({msg:"Error on query", err: err.stack}) }
        return response.send({ success: true, msg: "Question deleted." })
    })
}

export function deleteQuestion(response, request){
    let data = [request.body.id]
    pool.query("DELETE FROM question WHERE id = $1", data, (err, result, field) => {
        if (err) { return response.send({msg:"Error on query", err: err.stack}) }
        return response.send({ success: true, msg: "Question deleted." })
    })
}

export function getQuestionsByTopic(response, request){
    let data = [request.body.topicid]
    pool.query("SELECT * FROM question WHERE question.topic_id = $1", data).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getQuestionsByStudent(response, request){
    let data = [request.body.topicid]
    pool.query("SELECT * FROM question WHERE question.student_id = $1", data).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}

export function getAllQuestions(response, request){
    pool.query("SELECT * FROM question").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No ratings found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => console.log(err))
}
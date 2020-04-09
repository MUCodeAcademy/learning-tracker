import { pool } from '../config/postgres.conf'

export function postLesson(response, request) {
    let now = new Date();
    let lesson  = [request.body.cohortid, request.body.topicid,request.body.title, request.body.week, request.body.day, now]
    pool.query("INSERT INTO lesson(id, cohort_id, topic_id,lesson_title, week_number, day, last_edit) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)", lesson, (err, result, field) => {
        if (err) return response.send({msg:"Error on query", err: err.stack})
        return response.send({ success: true, msg: "Created New Lesson" })
    })
}

export function getAllLessons(response, request) {
    pool.query("SELECT * FROM lesson").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No lessons found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getLessonsByCohort(response, request) {
    let id = [request.body.params]
    pool.query("SELECT * FROM lesson WHERE cohort_id = $1", id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No lessons found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function updateLesson(response, request) {
    let now = new Date();
    let change = [request.body.cohort_id, request.body.topic_id,request.body.lesson_title, request.body.week_number, request.body.day, now, request.body.id];
    pool.query("UPDATE lesson SET cohort_id = $1, topic_id = $2, lesson_title = $3, week_number = $4, day = $5, last_date = $6 WHERE id =$7", change, now, (err, result, field) => {
        if (err) return response.send({msg:"Error on query", err: err.stack})
        return response.send({ success: true, msg: "Lesson updated." })
    })
}

export function deleteLesson(response, request){
    let data = [request.params.id]
    pool.query("DELETE FROM lesson WHERE id = $1", data, (err, result, field) => {
        if (err) return response.send({msg:"Error on query", err: err.stack})
        return response.send({ success: true, msg: "Lesson deleted." })
    })
}
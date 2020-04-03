import { client, pool } from '../config/postgres.conf'
​
​
export function postLesson(response, request) {
    let lesson  = [request.body.cohort_id, request.body.topic_id,request.body.lesson_title, request.body.week_number, request.body.day, request.body.last_edit]
    pool.query("INSERT INTO lesson(id, cohort_id, topic_id,lesson_title, week_number, day, last_edit) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)", lesson, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Created New Lesson" })
    })
}
​
export function getAllLessons(response, request) {
    pool.query("SELECT * FROM lesson").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No lessons found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}
​
export function updateLesson(response, request) {
    let change = [request.body.cohort_id, request.body.topic_id,request.body.lesson_title, request.body.week_number, request.body.day, request.body.last_edit];
    pool.query("UPDATE lesson SET cohort_id = $1, topic_id = $2, lesson_title = $3, week_number = $4, day = $5, last_edit = $6", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Lesson updated." })
    })
}
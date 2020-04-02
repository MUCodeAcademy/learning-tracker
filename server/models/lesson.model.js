import { client, pool } from '../config/postgres.conf'
​
​
export function newLesson(response, request) {
    let name = [request.name]
    pool.query("INSERT INTO lesson(id,name) VALUES (DEFAULT, $1)", name, (err, result, field) => {
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
    let change = [request.name, request.id];
    pool.query("UPDATE lesson SET name = $1 WHERE lessons.id = $2", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Lesson deleted." })
    })
}
​
export function deleteLesson(response, request) {
    let id = [request.id];
    pool.query("DELETE FROM lesson WHERE lessons.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Lesson deleted." })
    })
}
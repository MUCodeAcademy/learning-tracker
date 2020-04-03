import { pool } from '../config/postgres.conf'


export function newNote(response, request) {
    let data = [request.body.userid, request.body.lessonid, request.body.instructorid, request.body.text, request.body.read]
    pool.query("INSERT INTO note(id, user_id, lesson_id, instructor_id, note_text, note_read) VALUES (DEFAULT, $1, $2, $3, $4, $5)", data, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Created New Note" })
    })
}

export function getAllNotes(response, request) {
    pool.query("SELECT * FROM note").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function getAllNotesByStudent(response, request) {
    let student_id = [request.params.id]
    pool.query("SELECT * FROM notes WHERE student_id = $1", student_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function getAllNotesByCohort(response, request) {
    let id = [request.params.id]
    pool.query("SELECT data FROM note_get_all_by_cohort_id($1)", topic_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function getAllNotesByTopic(response, request) {
    let cohort_id = [request.body.topicid, request.body.cohortid]
    pool.query("SELECT data FROM note_get_all_by_topic_id($1,$2)", cohort_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function updateNote(response, request) {
    let note = [request.body.text, request.body.read, request.body.id]
    pool.query("UPDATE note SET note_text = $1, note_read = $2 WHERE note.id = $3", note, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Updated Note" })
    })
}

export function deleteNote(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM notes WHERE notes.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Note deleted." })
    })
}

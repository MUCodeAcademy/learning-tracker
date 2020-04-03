import { client, pool } from '../config/postgres.conf'


export function newNote(response, request) {
    let name = [request.body.name]
    let lesson_id = [request.body.lesson_id]
    let instructor_id = [request.body.instructor_id]
    let note_text = [request.body.note_text]
    let note_read = [request.body.note_read]
    pool.query("INSERT INTO note(id, note_name, lesson_id, instructor_id, note_text, note_read) VALUES (DEFAULT, $1, $2, $3, $4, $5)", name, lesson_id, instructor_id, note_text, note_read, (err, result, field) => {
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
    let student_id = [request.body.student_id]
    pool.query("SELECT * FROM notes WHERE student_id = $1", student_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function getAllNotesByTopic(response, request) {
    let topic_id = [req.body.topic_id]
    pool.query("SELECT * FROM notes WHERE topic_id = $1", topic_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function getAllNotesByCohort(response, request) {
    let cohort_id = [req.body.cohort_id]
    pool.query("SELECT * FROM notes WHERE cohort_id = $1", cohort_id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No notes found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

export function updateNote(response, request) {
    let note = [request.body.name, request.body.id]
    pool.query("UPDATE note SET note_name = $1 WHERE note.id = $2", note, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Updated Note" })
    })
}

export function deleteNote(response, request) {
    let id = [request.body.id];
    pool.query("DELETE FROM notes WHERE notes.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Note deleted." })
    })
}


module.exports.newNote = newNote
module.exports.updateNote = updateNote
module.exports.deleteNote = deleteNote
module.exports.getAllNotes = getAllNotes
module.exports.getAllNotesByStudent = getAllNotesByStudent
module.exports.getAllNotesByTopic = getAllNotesByTopic
module.exports.getAllNotesByCohort = getAllNotesByCohort
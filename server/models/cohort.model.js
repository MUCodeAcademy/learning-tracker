import { client, pool } from '../config/postgres.conf'


export function newCohort(response, request) {
    let name = [request.body.name]
    pool.query("INSERT INTO cohort(id,cohort_name) VALUES (DEFAULT, $1)", name, (err, result, field) => {
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
    .catch(err => console.log(err))
}

export function updateCohort(response, request) {
    let change = [request.body.name, request.body.id];
    pool.query("UPDATE cohort SET cohort_name = $1 WHERE cohort.id = $2", change, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort updated." })
    })
}

export function deleteCohort(response, request) {
    let id = [request.body.id];
    pool.query("DELETE FROM cohort WHERE cohort.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort deleted." })
    })
}

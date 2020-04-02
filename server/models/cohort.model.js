const { client, pool } = require('../config/postgres.conf')


function newCohort(response, request) {
    let name = [request.name]
    pool.query("INSERT INTO cohorts(id,name) VALUES (DEFAULT, $1)", name, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Created New Cohort" })
    })
}

function getAllCohorts(response, request) {
    pool.query("SELECT * FROM cohorts").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No cohorts found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => console.log(err))
}

function deleteCohort(response, request) {
    let id = [request.id];
    pool.query("DELETE FROM cohorts WHERE cohorts.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Cohort deleted." })
    })
}


module.exports.newCohort = newCohort
module.exports.deleteCohort = deleteCohort
module.exports.getAllCohorts = getAllCohorts
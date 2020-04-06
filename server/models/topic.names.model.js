import { pool } from '../config/postgres.conf'


export function getAllTopics(response, request) {
    pool.query("SELECT * FROM topic_type").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No topics found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
        .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
        .catch(err => {console.log(err)
            response.send({success: false, msg: "An error occurred."})
            })
}

export function deleteTopic(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM topic_type WHERE topic_type.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Topic deleted." })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function addTopic(response, request) {
    let topic = [request.body.topic]
    pool.query("INSERT INTO topic_type (id, topic) VALUES (DEFAULT, $1`)", topic, (err, result, field) =>{
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "Topic added." })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}



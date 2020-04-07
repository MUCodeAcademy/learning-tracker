import { pool } from '../config/postgres.conf'

export function getAllUsers(response, request) {
    pool.query("SELECT * FROM public.user").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No users found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllStudents(response, request) {
    pool.query("SELECT * FROM public.user WHERE public.user.role_id = 3").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No students found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllStudentsbyCohort(response, request) {
    let id = [request.params.id]
    pool.query("SELECT * FROM public.user JOIN cohort_to_student ON public.user.id = cohort_to_student.user_id JOIN cohort ON cohort_to_student.cohort_id = cohort.id WHERE cohort_to_student.cohort_id = $1 AND public.user.role_id = 3", id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No students found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllInstructors(response, request) {
    pool.query("SELECT * FROM public.user WHERE public.user.role_id = 2").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No instructors found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
    response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllInstructorsbyCohort(response, request) {
    let id = [request.params.id]
    pool.query("SELECT * FROM public.user JOIN cohort ON public.user.id = cohort.instructor_id WHERE cohort.id = $1", id).then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No instructors found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function getAllAdmin(response, request) {
    pool.query("SELECT * FROM public.user WHERE public.user.role_id = 1").then(res => {
        if (res.rows.length === 0) {
            return response.send({ success: false, msg: "No admin found." })
        }
        else return response.send({ success: true, msg: "Data retrieved.", data: res.rows })
    })
    .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
}

export function deleteUser(response, request) {
    let id = [request.params.id];
    pool.query("DELETE FROM public.user WHERE public.user.id = $1", id, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User deleted." })
    })
}

export function editUser(response, request) {
    console.log(request.body);
    let user =  [request.body.email_address, request.body.first_name, request.body.last_name, request.body.role_id, request.body.id]
    pool.query("UPDATE public.user SET email_address = $1, first_name = $2, last_name = $3, role_id = $4 WHERE public.user.id = $5", user, (err, result, field) => {
        if (err) { return console.log("Error on query", err.stack) }
        return response.send({ success: true, msg: "User updated." })
    })
}

export function getUserInfo(response, request) {
    console.log("FROM ANGULAR:", request.body)
    let email = [request.body.email_address]
    let user = [request.body.email_address, request.body.given_name, request.body.family_name]
    pool.query('SELECT * FROM public.user WHERE public.user.email_address = $1', email).then(res => {
        if (res.rows.length > 0) {
            return response.send({ success: true, msg: "Success", data: res.rows[0] })
        }
        else pool.query("INSERT INTO public.user (id, email_address, first_name, last_name, role_id) VALUES (DEFAULT, $1, $2, $3, 4)", user).then(resp => {
            if (resp.err) {
                return response.send({ success: false, err: resp.err });
            }
            pool.query("SELECT * FROM public.user WHERE public.user.email_address = $1", email).then(user => {
                return response.send({ success: true, msg: "Data retrieved.", data: user.rows[0] })
            
            })    
            .catch(err => {console.log(err)
                response.send({success: false, msg: "An error occurred."})
                })
       })
       .catch(err => {console.log(err)
        response.send({success: false, msg: "An error occurred."})
        })
    })
}

export function activateUser(response, request) {
    let data = [request.body.userId, request.body.cohortId]
    pool.query("SELECT data FROM user_activate($1, $2)", data).then(res => {
        return response.send({ success: true, msg: "Data retrieved.", data: res.rows[0] })
    })
}


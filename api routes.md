## API Routing Overview

All routes are organized as follows: '/api/category/details/maybemoredetails/'.   In this document they are organized by category

#### Cohort Routes

* GET `'/api/cohort/all'` - returns a list of all cohorts
* POST `'/api/cohort/new'` - creates a new cohort.  Requires name:(cohort name), instructorid:(instructor's user id)
* POST `'/api/cohort/assign'` - Assigns a student to a cohort.  Requires a cohortid:(id of cohort to be assigned), studentid:(username of student being assigned)
* PUT `'/api/cohort/update'` - updates a cohort.  Requires name:(cohort name), instructorid:(instructor's user id), and id: (cohort_id of the cohort to be updated)
* PUT `'/api/cohort/change'` - Changes a student's cohort.  Requires new cohortid & studentid, as well as the id of the entry on this table.  
* DELETE `'/api/cohort/delete/:id'` - deletes a cohort w/ cohort_id = to the id in the route. eg api/cohort/delete/3 deletes cohort with cohort_id 3.
* DELETE `'/api/cohort/remove/:id'` - removes a student from a cohort.  The ID is -the ID of the entry on the table you want to delete-, not the student or the cohort.

#### Users Routes

* GET `'/api/users/all'` - gets all users.
* GET `'/api/users/students'` - gets all users who are students only
* GET `'/api/users/students/cohort/:id'` - gets all users who are students in a cohort.  Id is the cohort_id of the cohort.
* GET `'/api/users/instructors'` - gets all instructors
* GET `'/api/users/instructors/cohort/:id'` - gets all instructors assigned to a cohort where id = cohort_id
* GET `'/api/users/admin'` - gets all admins
* POST `'/api/users/edit'` - edits a user's data.  Requires all user fields: first, last, email, role, and userid
* POST `'/api/users/userinfo'` - requests user info for a newly logged in user using the user's username.  If a user is not found, creates a new user account w/ an Unassigned role for that email.  Endpoint exists to query out the active user after Auth0 has authenticated the user.   This should only be used in one place in the entire application.
* POST `'/api/users/activate'` - Used to activate a new user as a student and assign a cohort.  Requires a userid and a cohortid.   
* DELETE `'/api/users/remove/:id'` - deletes a user w/ user_id equal to the id.

#### QUESTIONS

* GET `'/api/questions/all'` - gets ALL questions
* GET `'/api/questions/student/:id'` - gets all questions for the student with a user_id equal to the id
* GET `'/api/questions/lesson/:id'` - gets all questions for the lesson with lesson_id equal to the id
* GET `'/api/questions/topic/:id'` - gets all questions for the topic with topic_id equal to the id
* GET `'/api/questions/cohort/:id'` - gets all questions for all students in the cohort with cohort_id equal to the id
* POST `'/api/questions/new'` - makes a new question.  Requires studentid, instructorid, lessonid, question text, and question answer.
* PUT `'/api/questions/edit/'` - updates a question.  Requires studentid, instructorid, lessonid, question text, question answer, and the id of the question.
* DELETE `'/api/questions/delete/:id'` - deletes the question with id equal to the id provided.

#### Notes Routes

* GET `'/api/notes/all'` - gets ALL notes
* GET `'/api/notes/student/:id'` - gets all notes for the student whose user_id is the id
* GET `'/api/notes/cohort/:id'` - gets all notes for all students in the cohort with cohort_id as provided
* POST `'/api/notes/new'` - creates a new note.  Requires userid, lessonid, instructor id, text, and read(a boolean)
* POST `'/api/notes/topic/'` - gets all notes for a topic in a given cohort: requires topicid and cohortid
* PUT `'/api/notes/update'` - updates an existing note.  requires text, read(boolean), and the id of the note to update
* DELETE `'/api/notes/delete/:id'` - deletes the note with the id provided

#### Lessons Routes

GET `'/api/lessons/all'` - gets all lessons
POST `'/api/lessons/new'` - creates a new lesson.   Requires cohortid, topicid, title, week, and day
PUT `'/api/lessons/edit'` - updates a lesson.  Requires cohortid, topicid, title, week, day, and the id of the lesson.
DELETE `'/api/lessons/delete/:id'` - deletes lesson with a given id
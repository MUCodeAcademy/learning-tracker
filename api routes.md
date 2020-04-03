#### API Routing Overview

All routes are organized as follows: '/api/category/details/maybemoredetails/'.   In this document they are organized by category

## Cohort Routes

GET '/api/cohort/all' - returns a list of all cohorts
POST '/api/cohort/new' - creates a new cohort.  Requires name:(cohort name), instructorid:(instructor's user id)
POST '/api/cohort/assign' - Assigns a student to a cohort.  Requires a cohortid:(id of cohort to be assigned), studentid:(username of student being assigned)
PUT '/api/cohort/update' - updates a cohort.  Requires name:(cohort name), instructorid:(instructor's user id), and id: (cohort_id of the cohort to be updated)
PUT '/api/cohort/change' - Changes a student's cohort.  Requires new cohortid & studentid, as well as the id of the entry on this table.  
DELETE '/api/cohort/delete/:id' - deletes a cohort w/ cohort_id = to the id in the route. eg api/cohort/delete/3 deletes cohort with cohort_id 3.
DELETE '/api/cohort/remove/:id' - removes a student from a cohort.  The ID is -the ID of the entry on the table you want to delete-, not the student or the cohort.
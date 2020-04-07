import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cohort } from '../interfaces/Cohort.interface';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  constructor(private http: HttpClient) { }

  getAllCohorts() {
    return this.http.get("/api/cohort/all");
  }
  //* GET `'/api/cohort/all'` - returns a list of all cohorts

  createCohort(cohort: Cohort) {
    return this.http.post("/api/cohort/new", cohort);
  }
  //* POST `'/api/cohort/new'` - creates a new cohort.  Requires name:(cohort name), instructorid:(instructor's user id)
  
  deleteCohort(cohort_id: number) {
    return this.http.delete("/api/cohort/delete/"+cohort_id);
  }
  // * DELETE `'/api/cohort/delete/:id'` - deletes a cohort w/ cohort_id = to the id in the route. eg api/cohort/delete/3 deletes cohort with cohort_id 3.

  updateCohort(cohort: Cohort) {
    return this.http.put("/api/cohort/update", cohort);
  }
  // * PUT `'/api/cohort/update'` - updates a cohort.  Requires name:(cohort name), instructorid:(instructor's user id), and id: (cohort_id of the cohort to be updated)

  assignStudentToCohort(cohort: Cohort) {
    return this.http.post("/api/cohort/assign", cohort);
  }
  // * POST `'/api/cohort/assign'` - Assigns a student to a cohort.  Requires a cohortid:(id of cohort to be assigned), studentid:(username of student being assigned)
  
  removeStudentFromCohort(id: number) {
    return this.http.delete("/api/cohort/remove/"+id)
  }
  // * DELETE `'/api/cohort/remove/:id'` - removes a student from a cohort.  The ID is -the ID of the entry on the cohort_to_student table-, not the student or the cohort.  

  changeStudentsCohort(cohort: Cohort) {
    return this.http.put("/api/cohort/change", cohort);
  }
  // * PUT `'/api/cohort/change'` - Changes a student's cohort.  Requires new cohortid & studentid, as well as the id of the entry on the cohort_to_student table.  

}

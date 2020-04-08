import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cohort } from '../interfaces/Cohort.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Actions from '../store/actions'
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CohortService {
  cohortList$: Observable<Object>;

  constructor(private store: Store<RootState>, private http: HttpClient) { }

  getAllCohorts() {
    this.http.get("/api/cohort/all").subscribe((res: APIResponse) => {
      let data: Cohort[] = res.data
      this.store.dispatch(Actions.setCohortList({cohort_list: data}))
    })
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

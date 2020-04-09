import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cohort } from '../interfaces/cohort.interface';
import { APIResponse } from '../interfaces/apiresponse.interface';
import { RootState } from '../store';
import { Store } from '@ngrx/store';
import * as Actions from '../store/actions'
import { map } from 'rxjs/operators';
import { Enrollment } from '../interfaces/enrollment.interface'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CohortService {

  constructor(private http: HttpClient, private store: Store<RootState>, private snackbar: MatSnackBar) { }

  getAllCohorts() {
    return this.http.get("/api/cohorts/all").subscribe((res: APIResponse) => {
      if (res.success) {
      let data: Cohort[] = res.data
      this.store.dispatch(Actions.setCohortList({ list: data }))}
      else console.log("Couldn't get all cohorts.")
    })
  }
  //* GET `'/api/cohorts/all'` - returns a list of all cohorts

  createCohort(cohort: Cohort) {
    return this.http.post("/api/cohorts/new", cohort).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllCohorts()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })

    })
  };
  //* POST `'/api/cohorts/new'` - creates a new cohort.  Requires name:(cohort name), instructorid:(instructor's user id)

  deleteCohort(cohort_id: string) {
    return this.http.delete(`/api/cohorts/delete/${cohort_id}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllCohorts()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  };
  // * DELETE `'/api/cohorts/delete/:id'` - deletes a cohort w/ cohort_id = to the id in the route. eg api/cohorts/delete/3 deletes cohort with cohort_id 3.

  updateCohort(cohort: Cohort) {
    return this.http.put("/api/cohorts/update", cohort).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllCohorts()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })

    })
  };

  // * POST `'/api/cohorts/assign'` - Assigns a student to a cohort.  Requires a cohortid:(id of cohort to be assigned), studentid:(username of student being assigned)

  getStudentEnrollment(studentid: string) {
    return this.http.get(`/api/cohorts/enrollment/${studentid}`).subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Enrollment[] = res.data.data
        this.store.dispatch(Actions.setUserEnrollment({ enrollment: data[0] }))
      }
      else console.log("Couldn't get student enrollment info.")
    })
  }

  getCohortEnrollment() {
    return this.http.get('/api/cohorts/rosters').pipe(
      map((res: APIResponse) => {
        let cleaned: Enrollment[] = [];
        res.data.forEach(x => {
          cleaned.push(x.data)
        })
        res.data = cleaned
        return res
      }))
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Enrollment[] = res.data
          console.log(res.data, "hi its me get enrollment")
          this.store.dispatch(Actions.setCohortRosters({ rosters: data }))
        }
        else console.log("Couldnt get cohort enrollments")
      })

  }

  removeStudentfromCohort(topicid: string) {
    return this.http.delete(`/api/cohorts/remove/${topicid}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getCohortEnrollment()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }
  // * DELETE `'/api/cohorts/remove/:id'` - removes a student from a cohort.  The ID is -the ID of the entry on the cohort_to_student table-, not the student or the cohort.  

  changeStudentsCohort(cohort: Cohort) {
    return this.http.put("/api/cohorts/change", cohort).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getCohortEnrollment()
      }
      else this.snackbar.open("The database encountered an error, your work did not save.", "Close", { duration: 3000 })
    })
  }
  // * PUT `'/api/cohorts/change'` - Changes a student's cohort.  Requires new cohortid & studentid, as well as the id of the entry on the cohort_to_student table.  

}

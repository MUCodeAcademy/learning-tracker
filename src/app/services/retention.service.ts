import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Retention } from "../interfaces/retention.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../store";
import * as Actions from "../store/actions";
import * as Selectors from '../store/selectors';
import { map } from "rxjs/operators";
import { combineLatest, Observable } from 'rxjs'
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from '../interfaces/user.interface';
import { Cohort } from '../interfaces/Cohort.interface';
import { Enrollment } from '../interfaces/enrollment.interface';
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: "root",
})
export class RetentionService {
  user$: Observable<User>
  user: User

  constructor(
    private http: HttpClient, private store: Store<RootState>, private snackbar: MatSnackBar) {
      this.user$ = this.store.select(Selectors.getUserInfo)
      this.user$.subscribe((res: User) => this.user = res)
     }

  getUserRetentionData(user?: User) {
    let thisuser
    if (!user && this.user != "") {
      thisuser = this.user
    }
    else thisuser = user
    let cohortlist$ = this.store.select(Selectors.getCohortList)
    let enrollment$ = this.store.select(Selectors.getUserEnrollment)
    combineLatest([cohortlist$, enrollment$]).pipe(map(([list, enrollment]) => ({ list, enrollment }))).subscribe(res => {
      let clist: Cohort[] = res.list
      let enroll: Enrollment = res.enrollment
      if (thisuser.role_id === "1") {
        this.getAllRetentions()
      }
      else if (thisuser.role_id === "2" && clist.length > 0) {
        let mycohorts = clist.filter((cohort: Cohort) => { return cohort.instructor_id == thisuser.id })
        this.getRetentionByCohort(mycohorts[0].id)
      }
      else if (thisuser.role_id === "3" && enroll.id) {
        this.getRetentionByStudent(enroll.id)
    }})
  }

  getAllRetentions() {
    return this.http.get("/api/retention/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Retention[] = res.data;
        this.store.dispatch(Actions.getRetentions({ retentions: data }));
      } else console.log("Could not fetch retention data.");
    });
  }

  addRetention(newRetention: Retention) {
    console.log("only in student mode should i be seen", newRetention)
    return this.http
      .post("/api/retention/new", newRetention)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserRetentionData();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  getRetentionByStudent(userid) {
    return this.http
      .get(`/api/retention/student/${userid}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Retention[] = res.data;
          this.store.dispatch(Actions.getRetentions({ retentions: data }));
        } else console.log("Could not fetch retention data by student.");
      });
  }

  getRetentionByCohort(cohortid) {
    return this.http
      .get(`/api/retention/cohort/${cohortid}`)
      .pipe(
        map((res: APIResponse) => {
          let cleaned: Retention[] = [];
          if (res.data) {
            res.data.forEach((x) => {
              cleaned.push(x.data);
            });
          }
          res.data = cleaned;
          return res;
        })
      )
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Retention[] = res.data;
          this.store.dispatch(Actions.getRetentions({ retentions: data }));
        } else console.log("Could not get retention by cohort.");
      });
  }

  getRetentionByTopic(topicid, cohortid) {
    let topic = {
      topicid: topicid,
      cohortid: cohortid,
    };
    return this.http
      .post("/api/retention/topic", topic)
      .pipe(
        map((res: APIResponse) => {
          let cleaned: Retention[] = [];
          res.data.forEach((x) => {
            cleaned.push(x.data);
          });
          res.data = cleaned;
          return res;
        })
      )
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Retention[] = res.data;
          this.store.dispatch(Actions.getRetentions({ retentions: data }));
        } else console.log("Could not get retention by topic.");
      });
  }

  updateRetention(rating: Retention) {
    let update = {
      studentrating: rating.student_retention_rating,
      teacherrating: rating.teacher_retention_rating,
      id: rating.id,
      instructorid: rating.instructor_id
    };
    console.log(rating, "I should only be seen in instructor mode")
    return this.http.put("/api/retention/update", update).subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserRetentionData();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  deleteRetention(topicid) {
    return this.http
      .delete(`/api/retention/delete/${topicid}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getUserRetentionData();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  clearRetentions() {
    this.store.dispatch(Actions.clearRetention());
  }
}

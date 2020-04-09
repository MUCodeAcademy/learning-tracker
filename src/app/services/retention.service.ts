import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { apiresponse } from "../interfaces/apiresponse.interface";
import { Retention } from "../interfaces/retention.interface";
import { Store } from "@ngrx/store";
import { RootState } from "../store";
import * as Actions from "../store/actions";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class RetentionService {
  constructor(
    private http: HttpClient,
    private store: Store<RootState>,
    private snackbar: MatSnackBar
  ) {}

  getAllRetentions() {
    return this.http.get("/api/retention/all").subscribe((res: apiresponse) => {
      if (res.success) {
        let data: Retention[] = res.data;
        this.store.dispatch(Actions.getRetentions({ retentions: data }));
      } else console.log("Could not fetch retention data.");
    });
  }

  addRetention(newRetention: Retention) {
    return this.http
      .post("/api/retention/new", newRetention)
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.getAllRetentions();
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
      .subscribe((res: apiresponse) => {
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
        map((res: apiresponse) => {
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
      .subscribe((res: apiresponse) => {
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
        map((res: apiresponse) => {
          let cleaned: Retention[] = [];
          res.data.forEach((x) => {
            cleaned.push(x.data);
          });
          res.data = cleaned;
          return res;
        })
      )
      .subscribe((res: apiresponse) => {
        if (res.success) {
          let data: Retention[] = res.data;
          this.store.dispatch(Actions.getRetentions({ retentions: data }));
        } else console.log("Could not get retention by topic.");
      });
  }

  updateRetention(studentrating, teacherrating, topicid) {
    let update = {
      studentrating: studentrating,
      teacherrating: teacherrating,
      topicid: topicid,
    };
    return this.http
      .put("/api/retention/update", update)
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.getAllRetentions();
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
      .subscribe((res: apiresponse) => {
        if (res.success) {
          this.getAllRetentions();
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

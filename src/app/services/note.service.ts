import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { RootState } from "../store";
import * as Actions from "../store/actions/notes.action";
import { Note } from "../interfaces/notes.interface";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { APIResponse } from '../interfaces/APIResponse.interface';

@Injectable({
  providedIn: "root",
})
export class NoteService {
  constructor(
    private http: HttpClient,
    private store: Store<RootState>,
    private snackbar: MatSnackBar
  ) {}

  getAllNotes() {
    return this.http.get("/api/notes/all").subscribe((res: APIResponse) => {
      if (res.success) {
        let data: Note[] = res.data;
        this.store.dispatch(Actions.getNotes({ notes: data }));
      } else console.log("Couldn't get notes.");
    });
  }

  addNote(newNote: Note) {
    return this.http
      .post("/api/notes/new", newNote)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getAllNotes();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  notesByStudent(userid) {
    return this.http
      .get(`/api/notes/student/${userid}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Note[] = res.data;
          this.store.dispatch(Actions.getNotes({ notes: data }));
        } else console.log("Couldn't get notes by student.");
      });
  }

  notesByCohort(cohortid) {
    return this.http
      .get(`/api/notes/cohort/${cohortid}`)
      .pipe(
        map((res: APIResponse) => {
          let cleaned: Note[] = [];
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
          let data: Note[] = res.data;
          this.store.dispatch(Actions.getNotes({ notes: data }));
        } else console.log("Couldn't get notes by cohort.");
      });
  }

  notesByTopic(topicid, cohortid) {
    let topic = {
      topicid: topicid,
      cohortid: cohortid,
    };
    return this.http
      .post("/api/notes/topic", topic)
      .pipe(
        map((res: APIResponse) => {
          let cleaned: Note[] = [];
          res.data.forEach((x) => {
            cleaned.push(x.data);
          });
          res.data = cleaned;
          return res;
        })
      )
      .subscribe((res: APIResponse) => {
        if (res.success) {
          let data: Note[] = res.data;
          this.store.dispatch(Actions.getNotes({ notes: data }));
        } else console.log("Couldn't get notes by topic.");
      });
  }

  updateNote(text, read, noteid) {
    let update = {
      text: text,
      read: read,
      noteid: noteid,
    };
    return this.http
      .put("/api/notes/update", update)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getAllNotes();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }

  deleteNote(topicid) {
    return this.http
      .delete(`/api/notes/delete/${topicid}`)
      .subscribe((res: APIResponse) => {
        if (res.success) {
          this.getAllNotes();
        } else
          this.snackbar.open(
            "The database encountered an error, your work did not save.",
            "Close",
            { duration: 3000 }
          );
      });
  }
}

import { Injectable, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { Note } from '../interfaces/note.interface';
import * as Actions from '../store/actions';



@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private store: Store<RootState>) { }

  getAllNotes() {
    return this.http.get('/api/notes/all').subscribe((res: APIResponse) => {
      let data: Note[] = res.data
      this.store.dispatch(Actions.getNotes({ notes: data }))
    })
  }


  addNote(newNote: Note) {
    return this.http.post('/api/notes/new', newNote).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllNotes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  }

  notesByStudent(userid) {
    return this.http.get(`/api/notes/student/:${userid}`).subscribe((res: APIResponse) => {
      let data: Note[] = res.data
      this.store.dispatch(Actions.getNotes({ notes: data }))
    })
  }

  notesByCohort(noteid) {
    return this.http.get(`/api/notes/cohort/:${cohortid}`).subscribe((res: APIResponse) => {
      let data: Note[] = res.data
      this.store.dispatch(Actions.getNotes({ notes: data }))
    })
  }

  notesByTopic(topicid, cohortid) {
    let topic = {
      topicid: topicid,
      cohortid: cohortid
    }
    return this.http.post('/api/notes/topic', topic).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllNotes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  }

  updateNote(text, read, topicid) {
    let update = {
      text: text,
      read: read,
      topicid: topicid
    }
    return this.http.put('/api/notes/update', update).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllNotes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  }

  deleteNote(topicid) {
    return this.http.delete(`/api/notes/delete/:${topicid}`).subscribe((res: APIResponse) => {
      if (res.success) {
        this.getAllNotes()
      }
      else console.log("Error activating user, feedback to UI here.")
    })
  }

  clearNotes() {
    this.store.dispatch(Actions.clearNote())
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../interfaces/APIResponse.interface';
import { Retention } from '../interfaces/retention.interface';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import * as Actions from '../store/actions'

@Injectable({
  providedIn: 'root'
})
export class RetentionService {

  constructor(private http: HttpClient, private store: Store<RootState>) { }

getAllRetentions(){
  return this.http.get('/api/retention/all').subscribe((res: APIResponse) =>{
    let data: Retention [] = res.data
    this.store.dispatch(Actions.getRetentions({retentions: data}))
  })
}

addRetention(newRetention: Retention){
  return this.http.post('/api/retention/new', newRetention).subscribe((res: APIResponse) => {
    if (res.success) {
      this.getAllRetentions()
    }
    else console.log("Error activating user, feedback to UI here.")
  })
}

retentionByStudent(userid){
  return this.http.get(`/api/retention/student/:${userid}`).subscribe((res: APIResponse) =>{
    let data: Retention [] = res.data
    this.store.dispatch(Actions.getRetentions({retentions: data}))
  })
}

retentionByCohort(cohortid){
  return this.http.get(`/api/retention/cohort/:${cohortid}`).subscribe((res: APIResponse) =>{
    let data: Retention [] = res.data
    this.store.dispatch(Actions.getRetentions({retentions: data}))
  })
}

retentionByTopic(topicid, cohortid){
  let topic = {
    topicid: topicid,
    cohortid: cohortid
  }
  return this.http.post('/api/retention/topic', topic).subscribe((res: APIResponse) => {
    if (res.success) {
      this.getAllRetentions()
    }
    else console.log("Error activating user, feedback to UI here.")
  })
}

updateRetention(studentrating, teacherrating, topicid){
  let update = {
    studentrating: studentrating,
    teacherrating: teacherrating,
    topicid: topicid
  }
  return this.http.put('/api/retention/update', update).subscribe((res: APIResponse) => {
    if (res.success) {
      this.getAllRetentions()
    }
    else console.log("Error activating user, feedback to UI here.")
  })
}

deleteRetention(topicid){
  return this.http.delete(`/api/retention/delete/:${topicid}`).subscribe((res: APIResponse) => {
    if (res.success) {
      this.getAllRetentions()
    }
    else console.log("Error activating user, feedback to UI here.")
  })
}

clearRetentions(){
  this.store.dispatch(Actions.clearRetention())
}

}

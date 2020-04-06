import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetentionService {

  constructor(private http: HttpClient) { }

getAllRetentions(){
  return this.http.get('/api/retention/all')
}

addRetention(userid, lessonid, topicid, instructorid, studentrating, teacherrating){
  return this.http.post('/api/retention/new', { userid: userid, lessonid: lessonid, topicid: topicid, instructorid: instructorid, studentrating: studentrating, teacherrating: teacherrating })
}

retentionByStudent(userid){
  return this.http.get(`/api/retention/student/:${userid}`)
}

retentionByCohort(cohortid){
  return this.http.get(`/api/retention/cohort/:${cohortid}`)
}

retentionByTopic(topicid, cohortid){
  return this.http.post('/api/retention/topic', {topicid: topicid, cohortid: cohortid})
}

updateRetention(studentrating, teacherrating, topicid){
  return this.http.put('/api/retention/update', { studentrating: studentrating, teacherrating: teacherrating, id: topicid })
}

deleteRetention(topicid){
  return this.http.delete(`/api/retention/delete/:${topicid}`)
}

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { Lesson } from '../interfaces/lesson.interface';
import { Observable, combineLatest } from 'rxjs';
import * as Selectors from '../store/selectors';
import * as Actions from '../store/actions';
import { map } from 'rxjs/operators';
import { Retention } from '../interfaces/retention.interface';
import { User } from '../interfaces/user.interface';
import { Cohort } from '../interfaces/Cohort.interface';


@Component({
  selector: 'app-lesson-landing',
  templateUrl: './lesson-landing.component.html',
  styleUrls: ['./lesson-landing.component.scss']
})
export class LessonLandingComponent implements OnInit {
  lessonlist$: Observable<Lesson[]>
  lessonlist: Lesson[]
  selectedlesson$: Observable<string>
  selectedlesson: string
  viewlesson: Lesson
  retentions$: Observable<Retention[]>
  retentions: Retention[]
  cohortlist$: Observable<Cohort[]>
  cohortlist: Cohort[]
  user$: Observable<User>
  user: User

  retentiontemplate: Retention = {
    id: "",
    user_id: "",
    lesson_id: "",
    topic_id: 0,
    instructor_id: 0,
    student_retention_rating: 0,
    teacher_retention_rating: 0,
  }

  constructor(private store: Store<RootState>) {
    this.lessonlist$ = this.store.select(Selectors.getLessons)
    this.selectedlesson$ = this.store.select(Selectors.getViewedLesson)
    this.retentions$ = this.store.select(Selectors.getRetentions)
    this.user$ = this.store.select(Selectors.getUserInfo)
    this.cohortlist$ = this.store.select(Selectors.getCohortList)
  }

  ngOnInit(): void {
    combineLatest([this.lessonlist$, this.selectedlesson$]).pipe(map(([list, lesson]) => ({ list, lesson }))).subscribe(res => {
      this.lessonlist = res.list
      this.selectedlesson = res.lesson
      if (res.list.length > 0 && res.lesson) {
        let filtered = res.list.filter((obj: Lesson) => { return obj.id === res.lesson })
        this.viewlesson = filtered[0]
        this.store.dispatch(Actions.setViewedLesson({lessonid: this.viewlesson.id}))
      }
      else if (res.list.length > 0 && !res.lesson) {
        this.viewlesson = this.lessonlist[0]
        this.store.dispatch(Actions.setViewedLesson({lessonid: this.viewlesson.id}))
      }
    })
    combineLatest([this.selectedlesson$, this.user$, this.retentions$, this.cohortlist$]).pipe(map(([lesson, user, retention, list]) => ({ lesson, user, retention, list }))).subscribe(res => {
      this.user = res.user
      let filtered: Retention[] = []
      if (res.lesson != "" && res.retention.length > 0 && res.user.id != "" && res.list.length > 0) {
        filtered = res.retention.filter((obj: Retention) => { return obj.lesson_id === res.lesson })
      }
      else {
        let newretention = { ...this.retentiontemplate, lesson_id: res.lesson, user_id: res.user.id }
        filtered.push(newretention)
      }
      this.retentions = filtered
    })
}

}

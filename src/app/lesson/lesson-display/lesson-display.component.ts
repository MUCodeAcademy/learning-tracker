import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import * as qclone from 'qclone'

@Component({
  selector: 'app-lesson-display',
  templateUrl: './lesson-display.component.html',
  styleUrls: ['./lesson-display.component.scss']
})
export class LessonDisplayComponent implements OnInit {
  lessonList$: Observable<any>
  lessonList: Array<Lesson>
  viewedLesson$: Observable<any>
  viewedLesson: number

  constructor(private store: Store<RootState>) {
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.viewedLesson$ = this.store.select(Selectors.getViewedLesson);
   }

  ngOnInit(): void {
    this.lessonList$.subscribe((res: Lesson[]) => {
      this.lessonList = qclone.qclone(res)
    })
    this.viewedLesson$.subscribe((res: number) => {
      this.viewedLesson = qclone.qclone(res)
    })
  }

}

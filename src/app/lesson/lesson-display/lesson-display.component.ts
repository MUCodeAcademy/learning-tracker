import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import * as Actions from '../../store/actions';

@Component({
  selector: 'app-lesson-display',
  templateUrl: './lesson-display.component.html',
  styleUrls: ['./lesson-display.component.scss']
})
export class LessonDisplayComponent implements OnInit {
  lessonList$: Observable<any>
  lessonList: Array<Lesson>
  viewedLessonid$: Observable<any>
  viewedLessonid: string
  viewedLesson: Lesson

  constructor(private store: Store<RootState>) {
    this.store.dispatch(Actions.setViewedLesson({lessonid: "3"}));  // THIS IS FOR TESTING ONLY
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.viewedLessonid$ = this.store.select(Selectors.getViewedLesson);
   }

  ngOnInit(): void {
    this.lessonList$.subscribe((res: Lesson[]) => {
      this.lessonList = res
    })
    this.viewedLessonid$.subscribe((res: string) => {
      this.viewedLessonid = res;
      let target = this.lessonList.find(obj => {return obj.id === res})
      this.viewedLesson = target
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import { map } from 'rxjs/operators';
import { LessonEditComponent } from '../lesson-edit/lesson-edit.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private store: Store<RootState>, public dialog: MatDialog) {
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.viewedLessonid$ = this.store.select(Selectors.getViewedLesson);
  }

  ngOnInit(): void {

    combineLatest([this.lessonList$, this.viewedLessonid$]).pipe(
      map(([list, viewedId]) => ({list, viewedId}))
  )
  .subscribe(pair => {
      this.lessonList = pair.list as Lesson[]
      this.viewedLessonid = pair.viewedId;
      let target = this.lessonList.find(obj => { return obj.id === pair.viewedId })
      this.viewedLesson = target
  })
  }

  edit(){
    let dialog = this.dialog.open(LessonEditComponent, {
      
      data: {id: this.viewedLessonid}
    })
  }
}

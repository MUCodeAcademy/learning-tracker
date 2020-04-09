import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import * as Selectors from '../../store/selectors';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import * as Actions from '../../store/actions';
import { map } from 'rxjs/operators';

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
    this.lessonid("3")
    this.store.dispatch(Actions.setViewedLesson({ lessonid: "3" }));  // THIS IS FOR TESTING ONLY
    this.lessonList$ = this.store.select(Selectors.getLessons);
    this.viewedLessonid$ = this.store.select(Selectors.getViewedLesson);
  }

  lessonid(id) {
    this.store.dispatch(Actions.setViewedLesson({ lessonid: id }))
  }

  ngOnInit(): void {

    combineLatest([this.lessonList$, this.viewedLessonid$]).pipe(
      map(([list, viewedId]) => ({list, viewedId}))
  )
  .subscribe(pair => {
  
      this.lessonList = pair.list as Lesson[]
      console.log(pair.viewedId, "Im the ID")
      this.viewedLessonid = pair.viewedId;
      console.log('lessonList below:')
      console.log(this.lessonList);
      let target = this.lessonList.find(obj => { console.log(obj, "its me here in the find"); return obj.id === pair.viewedId })
      console.log('target is', target)
      this.viewedLesson = target
  // });
  //   this.lessonList$.subscribe((res: Lesson[]) => {
  //     console.log(res)
  //     this.lessonList = res
  //   })
  //   this.viewedLessonid$.subscribe((res: string) => {
  //     console.log(res, "Im the ID")
  //     this.viewedLessonid = res;
  //     console.log('lessonList below:')
  //     console.log(this.lessonList);
  //     let target = this.lessonList.find(obj => { console.log(obj, "its me here in the find"); return obj.id === res })
  //     console.log('target is', target)
  //     this.viewedLesson = target
  //   })
  })
  }
}

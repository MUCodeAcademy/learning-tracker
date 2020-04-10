import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cohort } from 'src/app/interfaces/cohort.interface';
import { RootState } from 'src/app/store';
import { Store } from '@ngrx/store';
import * as Selectors from "../../store/selectors"
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from 'src/app/interfaces/lesson.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonService } from 'src/app/services/lesson.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit {

  cohortList$: Observable<Cohort[]>;
  lessons$: Observable<Lesson[]>;
  lessons: Lesson[] = [];
  lessonForm: FormGroup;
  constructor(private store: Store<RootState>, public dialogRef: MatDialogRef<LessonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private lessonService: LessonService) {

    this.cohortList$ = this.store.select(Selectors.getCohortList)
    this.lessons$ = this.store.select(Selectors.getLessons)
  }

  ngOnInit(): void {
    this.lessons$.subscribe(val => this.lessons = val);
    this.lessonForm = this.fb.group({
      cohort_id: ['', Validators.compose([Validators.required])],
      week_number: ['', Validators.compose([Validators.required])],
      lesson_title: ['', Validators.compose([Validators.required])],
      topic_id: ['0'],
      day: ['', Validators.compose([Validators.required])],
      lesson_content: ['', Validators.compose([Validators.required])]
    })

    if (this.data.id) {
      let lesson: Lesson = this.lessons.filter(v => v.id === this.data.id)[0]
      this.lessonForm.patchValue({
        cohort_id: lesson.cohort_id,
        week_number: lesson.week_number,
        lesson_title: lesson.lesson_title,
        day: lesson.day,
        content: lesson.lesson_content
      })
    }

  }

  close() {
    this.dialogRef.close();
  }
  upsertLesson() {
    if (this.lessonForm.valid) {
      let lesson: Lesson = { ...this.lessonForm.value };
      if (this.data.id) {
        lesson = { ...lesson, id: this.data.id }
        this.lessonService.editLesson(lesson, this.dialogRef);

      }
      else {
        this.lessonService.newLesson(lesson, this.dialogRef);

      }
    }
    else {
      this.lessonForm.markAllAsTouched();
    }
  }

}

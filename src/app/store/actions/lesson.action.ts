import {createAction, props} from '@ngrx/store';
import { Lesson } from '../../interfaces/lesson.interface'

export const setLessons = createAction('[LESSON STATE] Set Lessons', props<{lessons: Lesson[]}>());
export const setViewedLesson = createAction('[LESSON STATE] Set Viewed Lesson', props<{lessonid: string}>())
export const clearLessons = createAction('[LESSON STATE Clear Lessons');
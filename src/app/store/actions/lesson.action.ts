import {createAction, props} from '@ngrx/store';
import { Lesson } from '../../interfaces/lesson.interface'

export const setLessons = createAction('[LESSON STATE] Set Lessons', props<{lessons: Lesson}>());
export const addLesson = createAction('[LESSON STATE] Add Lesson', props<{lesson: Lesson}>());
export const clearLessons = createAction('[LESSON STATE Clear Lessons');
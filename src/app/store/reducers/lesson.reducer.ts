import * as lessonActions from '../actions/lesson.action'
import { createReducer, on, Action } from '@ngrx/store';

export interface LessonState {
    id: string,
    cohort_id: string,
    topic_id: string,
    lesson_title: string,
    week_number: number,
    day: string,
    last_edit: string
}

export const initialLessonState: LessonState = {
    id: '',
    cohort_id: '',
    topic_id: '',
    lesson_title: '',
    week_number: 0,
    day: '',
    last_edit: ''
}

const reducer = createReducer(initialLessonState,
    on()
    )
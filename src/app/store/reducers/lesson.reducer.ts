import * as lessonActions from '../actions/lesson.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Lesson } from 'src/app/interfaces/lesson.interface';


export interface LessonState {
   lessons: Lesson[]
}

export const initialLessonState: LessonState = {
    lessons: []
}

const reducer = createReducer(initialLessonState,
    on(lessonActions.setLessons, (state, {lessons}) =>({...state, id: lessons.id, cohort_id: lessons.cohort_id, topic_id: lessons.topic_id, lesson_title: lessons.lesson_title, week_number: lessons.week_number, day: lessons.day, last_edit: lessons.last_edit })),
    on(lessonActions.addLesson, (state, {lesson}) =>({...state, lessons:[...state.lessons, lesson]})),
    on(lessonActions.clearLessons, (state)=> ({...initialLessonState}))
)


export function lessonReducer(state: LessonState, action: Action){
    return reducer(state, action);
}
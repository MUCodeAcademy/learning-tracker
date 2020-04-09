import * as lessonActions from '../actions/lesson.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Lesson } from 'src/app/interfaces/lesson.interface';


export interface LessonState {
   lessons: Lesson[],
   viewedLesson: string,
}

export const initialLessonState: LessonState = {
    lessons: [],
    viewedLesson: ""
}

const reducer = createReducer(initialLessonState,
    on(lessonActions.setLessons, (state, {lessons}) =>({...state, lessons: lessons})),
    on(lessonActions.setViewedLesson, (state, {lessonid}) => ({...state, viewedLesson: lessonid})),
    on(lessonActions.clearLessons, (state)=> ({...initialLessonState}))
)


export function lessonReducer(state: LessonState, action: Action){
    return reducer(state, action);
}
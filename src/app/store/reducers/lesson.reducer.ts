import * as lessonActions from '../actions/lesson.action'
import { createReducer, on, Action } from '@ngrx/store';

export interface LessonState {
    userEmail: string,
    userRole: string,
    userFirst: string,
    userLast: string,
    userId: string
};
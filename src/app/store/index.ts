import * as Reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    user: Reducers.UserState,
    lesson: Reducers.LessonState
}

export const reducers: ActionReducerMap<RootState> = {
    user: Reducers.userReducer,
    lesson: Reducers.lessonReducer,
}
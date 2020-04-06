import * as Reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    user: Reducers.UserState,
    lessons: Reducers.LessonState
}

export const reducers: ActionReducerMap<RootState> = {
    user: Reducers.userReducer,
    lessons: Reducers.lessonReducer,
}
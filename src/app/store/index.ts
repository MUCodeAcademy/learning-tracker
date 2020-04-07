import * as Reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    cohort: Reducers.CohortState,
    user: Reducers.UserState,
    lessons: Reducers.LessonState,
    retentions: Reducers.RetentionState
}

export const reducers: ActionReducerMap<RootState> = {
    cohort: Reducers.cohortReducer,
    user: Reducers.userReducer,
    lessons: Reducers.lessonReducer,
    retentions: Reducers.retentionReducer
}
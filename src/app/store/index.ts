import * as Reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    cohort: Reducers.CohortState,
    user: Reducers.UserState,
}

export const reducers: ActionReducerMap<RootState> = {
    cohort: Reducers.cohortReducer,
    user: Reducers.userReducer,
}
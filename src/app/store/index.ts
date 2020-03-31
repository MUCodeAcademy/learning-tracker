import * as Reducers from './reducers';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    user: Reducers.UserState,
}

export const reducers: ActionReducerMap<RootState> = {
    user: Reducers.userReducer,
}

export const getUserState = (state: RootState) => state.user;
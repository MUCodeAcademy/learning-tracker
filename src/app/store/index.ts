import * as userReducer from './reducers/user.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface RootState{
    user: userReducer.UserState,
}

export const reducers: ActionReducerMap<RootState> = {
    user: userReducer.reducer,
}

export const getUserState = (state: RootState) => state.user;
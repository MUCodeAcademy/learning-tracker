import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';

export interface UserState {
    userEmail: string
    userRole: string
};

export const initialUserState: UserState = {
    userEmail: '',
    userRole: ''
};

const reducer = createReducer(
    initialUserState,
    on(userActions.setUserEmail, (state, {userEmail})=> ({...state, userEmail: userEmail })),
    on(userActions.clearUser, (state)=> ({...initialUserState}))
);

export function userReducer(state: UserState, action: Action){
    return reducer(state, action);
}
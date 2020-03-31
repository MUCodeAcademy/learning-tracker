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

const userReducer = createReducer(
    initialUserState,
    on(userActions.setUser, (state, {userEmail, userRole})=> ({...state, userEmail: userEmail, userRole: userRole})),
    on(userActions.clearUser, (state)=> ({...initialUserState}))
);

export function reducer(state: UserState, action: Action){
    return userReducer(state, action);
}
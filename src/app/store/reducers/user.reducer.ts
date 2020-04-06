import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/User.interface';

export interface UserState {
    userEmail: string,
    userRole: string,
    userFirst: string,
    userLast: string,
    userId: string,
    userList: User[]
};

export const initialUserState: UserState = {
    userEmail: '',
    userRole: '4',
    userFirst: '',
    userLast: '',
    userId: '',
    userList: []
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserEmail, (state, {email})=> ({...state, userEmail: email })),
    on(userActions.setUserInfo, (state, {user}) => ({...state, userRole: user.role, userFirst: user.first_name, userLast: user.last_name, userId: user.id, userEmail: user.email})),
    on(userActions.setUserList, (state, {userlist}) => ({...state, userList: userlist})),
    on(userActions.clearUser, (state)=> ({...initialUserState}))
);

export function userReducer(state: UserState, action: Action){
    return reducer(state, action);
}
import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/User.interface';

export interface UserState {
    email: string,
    role: string,
    first_name: string,
    last_name: string,
    id: string,
    userList: User[]
};

export const initialUserState: UserState = {
    email: '',
    role: '4',
    first_name: '',
    last_name: '',
    id: '',
    userList: []
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserEmail, (state, {email})=> ({...state, email: email })),
    on(userActions.setUserInfo, (state, {user}) => ({...state, role: user.role, first_name: user.first_name, last_name: user.last_name, id: user.id, email: user.email})),
    on(userActions.setUserList, (state, {userlist}) => ({...state, userList: userlist})),
    on(userActions.clearUser, (state)=> ({...initialUserState}))
);

export function userReducer(state: UserState, action: Action){
    return reducer(state, action);
}
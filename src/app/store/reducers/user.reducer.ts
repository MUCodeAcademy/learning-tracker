import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export interface UserState {
    currentuser: User,
    userList: User[],
    enrollment: Object
};

export const initialUserState: UserState = {
    userList: [],
    currentuser: {
        role_id: '4',
        first_name: '',
        last_name: '',
        id: '',
        email_address: '',
    },
    enrollment: {}
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserInfo, (state, { user }) => ({ ...state, currentuser: user })),
    on(userActions.setUserList, (state, { userlist }) => ({ ...state, userList: userlist })),
    on(userActions.setUserEnrollment,(state, {enrollment}) => ({...state, enrollment: enrollment})),
    on(userActions.clearUser, (state) => ({ ...initialUserState }))
);

export function userReducer(state: UserState, action: Action) {
    return reducer(state, action);
}
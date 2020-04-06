import * as userActions from '../actions/user.action'
import { createReducer, on, Action } from '@ngrx/store';
import { User } from 'src/app/interfaces/User.interface';

export interface UserState {
    currentuser: {
        role_id: string,
        first_name: string,
        last_name: string,
        id: string,
        email: string,
    }
    userList: User[]
};

export const initialUserState: UserState = {
    userList: [],
    currentuser: {
        role_id: '4',
        first_name: '',
        last_name: '',
        id: '',
        email: '',
    }
};

const reducer = createReducer(initialUserState,
    on(userActions.setUserInfo, (state, { user }) => ({ ...state, currentuser: user })),
    on(userActions.setUserList, (state, { userlist }) => ({ ...state, userList: userlist })),
    on(userActions.clearUser, (state) => ({ ...initialUserState }))
);

export function userReducer(state: UserState, action: Action) {
    return reducer(state, action);
}
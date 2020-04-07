import {createAction, props} from '@ngrx/store';
import { User } from '../../interfaces/User.interface'

export const setUserInfo = createAction('[USER STATE] Set User Info', props<{user: User}>())
export const setUserList = createAction('[USER STATE] Set Userlist', props<{userlist: User[]}>())
export const clearUser = createAction('[USER STATE] Clear User')
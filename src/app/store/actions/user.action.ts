import {createAction, props} from '@ngrx/store';
import { User } from '../../interfaces/user.interface';
import { Enrollment } from 'src/app/interfaces/enrollment.interface';

export const setUserInfo = createAction('[USER STATE] Set User Info', props<{user: User}>())
export const setUserList = createAction('[USER STATE] Set Userlist', props<{userlist: User[]}>())
export const setUserEnrollment = createAction('[USER STATE] Set User Enrollment', props<{enrollment: Enrollment}>())
export const clearUser = createAction('[USER STATE] Clear User')
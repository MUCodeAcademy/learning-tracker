import {createAction, props} from '@ngrx/store'

export const setUserEmail = createAction('[USER STATE] Set User Email', props<{userEmail: string}>())
export const clearUser = createAction('[USER STATE] Clear User')
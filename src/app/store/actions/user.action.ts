import {createAction, props} from '@ngrx/store'

export const setUser = createAction('[USER STATE] Set User', props<{userEmail: string, userRole: string}>())
export const clearUser = createAction('[USER STATE] Clear User')
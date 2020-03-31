import {createAction, props} from '@ngrx/store'

export const setUser = createAction('[User State] Set User', props<{userEmail: string, userRole: string}>())
export const clearUser = createAction('[User State] Clear User')
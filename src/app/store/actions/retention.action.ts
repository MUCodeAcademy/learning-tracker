import {createAction, props} from '@ngrx/store';

export const getRetentions = createAction('[RETENTION STATE] Get Retentions', props<{retentions: Lesson}>());
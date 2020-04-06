import {createAction, props} from '@ngrx/store';
import { Retention } from 'src/app/interfaces/retention.interface';

export const getRetentions = createAction('[RETENTION STATE] Get Retentions', props<{retentions: Retention}>());
export const addRetention = createAction('[RETENTION STATE] Add Retention', props<{retention: Retention}>());
export const clearRetention = createAction('[RETENTION  STATE Clear Retentions');
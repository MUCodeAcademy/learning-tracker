import {createAction, props} from '@ngrx/store';
import { Cohort } from '../../interfaces/Cohort.interface'
import { Enrollment } from 'src/app/interfaces/enrollment.interface';

export const setCohortList = createAction('[COHORT STATE] Set Cohort Rosters', props<{list: Cohort[]}>())
export const setCohortRosters = createAction('[COHORT STATE] Set Cohort Rosters', props<{rosters: Enrollment[]}>())
export const clearCohortRosters = createAction('[COHORT STATE] Clear Cohort Rosters')
export const clearCohortList = createAction('[COHORT STATE] Clear Cohort List')

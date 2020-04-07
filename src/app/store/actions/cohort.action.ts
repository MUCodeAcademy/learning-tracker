import {createAction, props} from '@ngrx/store';
import { Cohort } from '../../interfaces/Cohort.interface'

export const setCohortName = createAction('[COHORT STATE] Set Cohort Name', props<{cohort_name: string}>())
export const setCohortInstructorId = createAction('[COHORT STATE] Set Cohort Instructor Id', props<{cohort_instructor_id: number}>())
export const setCohort = createAction('COHORT STATE] Set Cohort Info', props<{cohort: Cohort}>())
export const clearCohort = createAction('[COHORT STATE] Clear Cohort')
import * as cohortActions from '../actions/cohort.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Cohort } from 'src/app/interfaces/Cohort.interface';

export interface CohortState {
    cohortList: Cohort[];
    cohortId: number,
    cohortName: string,
    cohortInstructorId: number
};

export const initialCohortState: CohortState = {
    cohortList: [],
    cohortId: 0,
    cohortName: '',
    cohortInstructorId: 0,
};

const reducer = createReducer(initialCohortState,
    on(cohortActions.setCohortList, (state, {cohort_list}) => ({...state, cohortList: [...cohort_list]})),
    on(cohortActions.addToCohortList, (state, {cohort}) => ({...state, cohort: [...state.cohortList, cohort]})),
    on(cohortActions.setCohortName, (state, {cohort_name})=> ({...state, cohortName: cohort_name})),
    on(cohortActions.setCohortInstructorId, (state, {cohort_instructor_id})=> ({...state, cohortInstructorId: cohort_instructor_id})),
    on(cohortActions.setCohort, (state, {cohort}) => ({...state, cohortId: cohort.id, cohortName: cohort.cohort_name, cohortInstructorId: cohort.instructor_id})),
    on(cohortActions.clearCohort, (state)=> ({...initialCohortState}))
);

export function cohortReducer(state: CohortState, action: Action){
    return reducer(state, action);
}
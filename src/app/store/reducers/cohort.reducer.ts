import * as cohortActions from '../actions/cohort.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Enrollment } from 'src/app/interfaces/Enrollment.interface';
import { Cohort } from 'src/app/interfaces/cohort.interface';

export interface CohortState {
    list: Cohort[],
    rosters: Enrollment[]
};

export const initialCohortState: CohortState = {
    list: [],
    rosters: []
};

const reducer = createReducer(initialCohortState,
    on(cohortActions.setCohortList, (state, { list }) => ({...state, list: list})),
    on(cohortActions.setCohortRosters, (state, { rosters }) => ({...state, rosters: rosters})),
    on(cohortActions.clearCohortList, (state)=> ({...state, list: initialCohortState.list})),
    on(cohortActions.clearCohortRosters, (state)=> ({...state, rosters: initialCohortState.rosters}))
);

export function cohortReducer(state: CohortState, action: Action){
    return reducer(state, action);
}
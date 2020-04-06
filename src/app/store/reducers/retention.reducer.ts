import * as retentionActions from '../actions/retention.action'
import { createReducer, on, Action } from '@ngrx/store';
import { Retention } from 'src/app/interfaces/retention.interface'


export interface RetentionState {
    retentions: Retention []
}

export const initialRetentionState: RetentionState = {
    retentions: []
}

const reducer = createReducer(initialRetentionState,
    on(retentionActions.getRetentions, (state, {retentions}) => ({...state, retentions: retentions })),
    on(retentionActions.clearRetention, (state) => ({...initialRetentionState}))
    )


export function retentionReducer(state: RetentionState, action: Action){
    return reducer(state, action);
}
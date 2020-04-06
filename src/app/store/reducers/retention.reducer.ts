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
    on(retentionActions.getRetentions, (state, {retentions}) => ({...state, id: retentions.id, user_id: retentions.user_id, lesson_id: retentions.lesson_id, topic_id: retentions.topic_id, instructor_id: retentions.instructor_id, student_retention_rating: retentions.student_retention_rating, teacher_retention_rating: retentions.teacher_retention_rating })),
    on(retentionActions.addRetention, (state, {retention}) => ({...state, retentions:[...state.retentions, retention]})),
    on(retentionActions.clearRetention, (state) => ({...initialRetentionState}))
    )


export function retentionReducer(state: RetentionState, action: Action){
    return reducer(state, action);
}
import { RootState } from '..';

export const getCohortList = (state: RootState) => state.cohort.list
export const getCohortRosters = (state: RootState) => {console.log("STATE VIA ROSTER SELECTOR",state);return state.cohort.rosters}


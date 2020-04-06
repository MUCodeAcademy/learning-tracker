
import { RootState } from '..';

export const getUserRole = (state: RootState) => state.user.userRole
export const getUserEmail = (state: RootState) => state.user.userEmail
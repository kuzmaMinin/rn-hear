import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser } from '../../types/types';

export interface AuthState {
  user: IUser | null;
  isRecordPermissionsGranted: boolean;
  isNotificationPermissionsGranted: boolean;
}

const initialState: AuthState = {
  user: null,
  isRecordPermissionsGranted: false,
  isNotificationPermissionsGranted: false,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, user: PayloadAction<IUser>) => {
      state.user = user.payload;
    },
    setIsRecordPermissionsGranted: (
      state,
      isPermissionsGranted: PayloadAction<boolean>,
    ) => {
      state.isRecordPermissionsGranted = isPermissionsGranted.payload;
    },
    setIsNotificationPermissionsGranted: (
      state,
      isPermissionsGranted: PayloadAction<boolean>,
    ) => {
      state.isNotificationPermissionsGranted = isPermissionsGranted.payload;
    },
  },
});

export const {
  setUser,
  setIsRecordPermissionsGranted,
  setIsNotificationPermissionsGranted,
} = authSlice.actions;
export default authSlice.reducer;

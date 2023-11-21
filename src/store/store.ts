import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import recordsReducer from '../features/records/recordsSlice';

export const store = configureStore({
  reducer: {
    records: recordsReducer,
    user: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

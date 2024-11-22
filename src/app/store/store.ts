import { configureStore } from '@reduxjs/toolkit';
import { positionAPI } from './apiPosition';
import { employeeAPI } from './apiEmployee';

export const store = configureStore({
  reducer: {
    [positionAPI.reducerPath]: positionAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(positionAPI.middleware)
    .concat(employeeAPI.middleware),
});
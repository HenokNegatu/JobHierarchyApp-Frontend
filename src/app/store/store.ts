import { configureStore } from '@reduxjs/toolkit';
import { positionAPI } from './apiPosition';
import { employeeAPI } from './apiEmployee';
import { taskAPI } from './apiTask';

export const store = configureStore({
  reducer: {
    [positionAPI.reducerPath]: positionAPI.reducer,
    [employeeAPI.reducerPath]: employeeAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(positionAPI.middleware, employeeAPI.middleware, taskAPI.middleware)
});
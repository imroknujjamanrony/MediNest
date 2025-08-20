import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "@/features/doctorApi";
import { userApi } from "@/features/userApi";


export const store = configureStore({
  reducer: {
    
    [doctorApi.reducerPath]: doctorApi.reducer,
    [userApi.reducerPath]:userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApi.middleware),
});



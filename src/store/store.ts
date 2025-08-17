import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "@/features/doctorApi";


export const store = configureStore({
  reducer: {
    
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doctorApi.middleware),
});



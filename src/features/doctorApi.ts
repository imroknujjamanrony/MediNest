import { DoctorFormApplication } from "@/types/doctorForm";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), 
  tagTypes: ["Doctor"],
  endpoints: (builder) => ({
    // POST /api/doctors
    saveDoctorApplication: builder.mutation<DoctorFormApplication, DoctorFormApplication>({
      query: (doctorData) => ({
        url: "/apply-for-doctor",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    // GET /api/doctors
    getDoctors: builder.query<DoctorFormApplication[], void>({
      query: () => "/apply-for-doctor",
      providesTags: ["Doctor"],
    }),
  }),
});

export const {
  useSaveDoctorApplicationMutation,
  useGetDoctorsQuery,
} = doctorApi;

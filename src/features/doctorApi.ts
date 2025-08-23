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

    getDoctorById:builder.query<DoctorFormApplication,string>({
      query:(id)=>`/apply-for-doctor/${id}`,
      providesTags:(result,error,id)=>[{type: "Doctor",id}]
    }),

    // PATCH /api/apply-for-doctor/:id
    updateDoctorStatus: builder.mutation<
      DoctorFormApplication,
      { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/apply-for-doctor/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Doctor"],
    }),

  }),
});

export const {
  useSaveDoctorApplicationMutation,
   useUpdateDoctorStatusMutation,
  useGetDoctorsQuery,
  useGetDoctorByIdQuery
} = doctorApi;

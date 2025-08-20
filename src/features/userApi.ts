import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const  userApi=createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    tagTypes: ['User'],
    endpoints:(builder)=>({
        //get all the users
    getAllUsers:builder.query({
        query:()=>'/dashboard/admin/users',
        providesTags: ['User']
    })
    })

})
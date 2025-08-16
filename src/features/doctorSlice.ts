import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState:DoctorFormApplication[]=[];

const doctorFormSlice=createSlice({
    name:'doctorsApplication',
    initialState,
    reducers:{
        saveDoctorApplication:(state,action:PayloadAction<DoctorFormApplication>)=>{
            state.push(action.payload)
        }
    }
})

export const {saveDoctorApplication}=doctorFormSlice.actions
export default doctorFormSlice.reducer
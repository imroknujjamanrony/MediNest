import {configureStore} from '@reduxjs/toolkit'
import doctorFormSlice from '../features/doctorSlice'

export const store=configureStore({
    reducer:{
      doctorsApplication:doctorFormSlice
    }
})
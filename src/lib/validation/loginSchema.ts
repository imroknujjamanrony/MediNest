
import { z } from "zod";

export const loginFormSchema=z.object({
email:z.string().email('invalid email address'),
password:z.string().min(6,'minimum password should be 6 characters')
})

export type LoginFormValue=z.infer<typeof loginFormSchema>
import * as z from "zod"

export const studentSchema = z.object({
  matricula: z
    .string()
    .min(3, { message: "La matrícula debe tener al menos 3 caracteres" })
    .max(20, { message: "La matrícula no debe exceder 20 caracteres" }),
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no debe exceder 50 caracteres" }),
  grado: z
    .number({ required_error: "El grado es obligatorio" })
    .min(1, { message: "El grado debe ser entre 1 y 6" })
    .max(6, { message: "El grado debe ser entre 1 y 6" }),
  correo: z
    .string({ required_error: "El correo es obligatorio" })
    .email({ message: "Ingresa un correo válido" }),
})

export type StudentFormValues = z.infer<typeof studentSchema>

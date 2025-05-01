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
  grado: z.string({ required_error: "El grado es obligatorio" }),
  correoElectronico: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email({ message: "Ingresa un correo electrónico válido" }),
  teacher: z.string({ required_error: "El docente es obligatorio" }),
  averageGrade: z.string().optional(),
  attendance: z.string().optional(),
})

export type StudentFormValues = z.infer<typeof studentSchema>

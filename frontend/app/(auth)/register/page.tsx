import type { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Registrarse | Gestión de Calificaciones Primaria",
  description: "Crea una cuenta para el sistema de gestión de calificaciones",
}

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div style={{ borderColor: '#C09913' }} className="border-2 rounded-xl p-8 backdrop-blur-sm bg-black/10 shadow-lg">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Crear una cuenta</h1>
          <p className="text-sm text-muted-foreground">Ingresa tu información para crear una cuenta</p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-brand underline underline-offset-4">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </p>
      </div>
    </div>
      </div>
  )
}

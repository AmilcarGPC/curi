import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { FraseMotivacional } from "@/components/auth/fraseMotivacional";

export const metadata: Metadata = {
  title: "Iniciar sesión | Gestión de Calificaciones Primaria",
  description: "Inicia sesión en el sistema de gestión de calificaciones",
};

export default function LoginPage() {
  return (
    <div className="container relative flex h-screen w-screen flex-col items-center justify-center gap-20">
      {/* Tu estructura sigue igual... */}
      <div style={{ borderColor: '#C09913' }} className="border-2 rounded-xl p-8 backdrop-blur-sm bg-black/10 shadow-lg">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <img src="/logo_uady_dorado.png" alt="logo_uady_dorado" className="w-32 h-auto mx-auto" />
            <h1 className="text-2xl font-semibold tracking-tight text-white">Iniciar Sesión</h1>
          </div>
          <LoginForm /> {/* Este sí es Client Component */}
          <p className="px-50 text-center text-sm text-muted-foreground">
            <Link href="/register" className="hover:text-brand underline underline-offset-4">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </p>
        </div>
      </div>
      <FraseMotivacional />
    </div>
  );
}

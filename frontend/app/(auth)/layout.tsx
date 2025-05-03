import type React from "react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <div className="relative min-h-screen w-full">

    {/* Fondo con gradiente encima de todo */}
    <div
    className="absolute top-0 left-0 w-full h-full z-0"
    style={{
      backgroundImage: 'radial-gradient(circle at center, rgba(0, 31, 64, 1) 30%, rgb(0, 0, 0) 90%)',
    }}
  ></div>

  {/* Fondo con imagen */}
  <div
    className="absolute top-0 left-0 w-full h-full z-1"
    style={{
      backgroundImage: 'url("/login_bk.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  ></div>

  {/* Contenido principal */}
  <div className="relative z-10">
    <main className="container flex items-center justify-center md:col-span-2 lg:col-span-1">{children}</main>
  </div>

  {/* Logo Izquierdo */}
  <img src="/logo_lcc_blanco.png" alt="Logo Izquierdo" className="absolute top-4 left-4 w-19 h-auto" />

  {/* Logo Derecho */}
  <img src="/logo_fmat_blanco.png" alt="Logo Derecho" className="absolute top-4 right-4 w-18 h-auto" />
</div>

  )
}

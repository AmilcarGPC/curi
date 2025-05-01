import type React from "react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
      <div className="hidden bg-muted p-10 text-white md:flex md:flex-col md:justify-between lg:col-span-1">
        <div className="flex items-center gap-2 text-lg font-medium text-primary">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="School Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span>Elementary School</span>
        </div>
        <div className="space-y-2">
          <p className="text-lg text-muted-foreground">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
          <p className="font-medium text-muted-foreground">- Nelson Mandela</p>
        </div>
      </div>
      <main className="container flex items-center justify-center md:col-span-2 lg:col-span-1">{children}</main>
    </div>
  )
}

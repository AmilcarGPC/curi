"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
      message: "Por favor ingresa un correo electrónico válido.",
    }),
    password: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { email, password, name } = values
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    })
    setIsLoading(false)
    if (error) {
      toast({
        title: "Error al registrar",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada. Revisa tu correo para confirmar.",
    })
    router.push("/login")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Nombre</FormLabel>
              <FormControl>
                <Input className="text-white placeholder-white" placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Correo Electrónico</FormLabel>
              <FormControl>
                <Input className="text-white placeholder-white" placeholder="nombre@escuela.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Contraseña</FormLabel>
              <FormControl>
                <Input type="password" className="text-white placeholder-white" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input type="password" className="text-white placeholder-white" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-[#C09913] hover:bg-[#b58a10] text-white text-xl rounded-2x1 py-4"
          disabled={isLoading}
        >
          {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
        </Button>
      </form>
    </Form>
  )
}

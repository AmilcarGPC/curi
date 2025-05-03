"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputConIcono } from "@/components/ui/input_con_icono"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  password: z.string().min(8, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { email, password } = values
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setIsLoading(false)
    if (error) {
      toast({
        title: "Error de autenticación",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Inicio de sesión exitoso",
      description: "Redirigiendo al panel...",
    })
    router.push("/dashboard")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputConIcono  
                placeholder="Usuario"
                icon={<img src="/Usuario_Vector.svg" alt="User Icon" className="w-6 h-6" />}
                {...field} />
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
              <FormControl>
              <InputConIcono  
                type="password"
                placeholder="Contraseña"
                icon={<img src="/Contraseña_Vector.png" alt="User Icon"  />}
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

         {/* Checkbox + Link */}
    <div className="flex items-center justify-between text-sm">
      <label className="flex items-center gap-2">
        <input type="checkbox" className="accent-[#C09913] w-4 h-4" />
        <span className="text-white">Recordarme</span>
      </label>
      <a href="/forgot-password" className="text-[#C09913] hover:underline">
        ¿Olvidaste contraseña?
      </a>
    </div>

        <Button type="submit" 
          className="w-full bg-[#C09913] hover:bg-[#b58a10] text-white text-xl rounded-2x1 py-4" 
          disabled={isLoading}>
          {isLoading ? "Iniciando sesión..." : "Ingresar"}
        </Button>
      </form>
    </Form>
  )
}

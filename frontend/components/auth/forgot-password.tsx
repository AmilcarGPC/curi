"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
})

export function PasswordResetForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { email } = values
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })
    
    setIsLoading(false)
    
    if (error) {
      toast({
        title: "Error al enviar correo",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    
    setEmailSent(true)
    toast({
      title: "Correo enviado",
      description: "Revisa tu bandeja de entrada para restablecer tu contraseña.",
    })
  }

  return (
    <div className="space-y-6">
      {emailSent ? (
        <div className="text-center space-y-2">
          <h2 className="text-lg font-medium">Correo enviado</h2>
          <p className="text-muted-foreground">
            Hemos enviado un correo con instrucciones para restablecer tu contraseña.
            Por favor revisa tu bandeja de entrada.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-2 text-center">
            <h2 className="text-lg font-medium">¿Olvidaste contraseña?</h2>
            <p className="text-muted-foreground">
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="nombre@escuela.edu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Enviando correo..." : "Enviar correo de recuperación"}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
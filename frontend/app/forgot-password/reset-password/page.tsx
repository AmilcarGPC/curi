"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { InputConIcono } from "@/components/ui/input_con_icono";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/app/(auth)/layout";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un correo electrónico válido." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación debe tener al menos 6 caracteres." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Valores enviados:", values);
    // Aquí puedes manejar la lógica para resetear la contraseña
  };

  return (
    <AuthLayout>
      <div className="container relative flex h-screen w-screen flex-col items-center justify-center gap-20">
      <div className="flex h-screen w-screen items-center justify-center">
      <div className="container relative flex flex-col items-center justify-center gap-20">
        <div style={{ borderColor: "#C09913" }} className="border-2 rounded-xl p-12 backdrop-blur-sm bg-black/10 shadow-lg">
          <h1 className="text-2xl font-semibold tracking-tight text-center mb-8">Restablecer Contraseña</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Input personalizado para email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputConIcono
                        placeholder="Correo electrónico"
                        icon={<img src="/Usuario_Vector.svg" alt="User Icon" className="w-6 h-6" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input personalizado para contraseña */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputConIcono
                        placeholder="Nueva contraseña"
                        type="password"
                        icon={<img src="/Contraseña_Vector.png" alt="Lock Icon" className="w-6 h-6" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Input personalizado para confirmar contraseña */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputConIcono
                        placeholder="Confirma tu contraseña"
                        type="password"
                        icon={<img src="/Contraseña_Vector.png" alt="Lock Icon" className="w-6 h-6" />}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full bg-[#C09913] hover:bg-[#b58a10] text-white text-xl rounded-2x1 py-4"
              >
                Restablecer Contraseña
              </Button>
            </form>
          </Form>

          <Link
            href="/login"
            className="hover:text-brand underline underline-offset-4 text-center block mt-6"
          >
            Volver a inicio de sesión
          </Link>
        </div>
      </div>
    </div>
      </div>
    
    </AuthLayout>
  );
};

export default ResetPasswordPage;
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputConIcono } from "@/components/ui/input_con_icono";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import AuthLayout from "@/app/(auth)/layout";

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { email } = values;

    // Llamada a la API de Supabase para enviar el correo de recuperación
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`, // URL a la que será redirigido el usuario
    });

    setIsLoading(false);

    if (error) {
        toast({
            title: "Error al recuperar la contraseña",
            description: error.message,
            variant: "destructive",
        });
        return;
    }

    toast({
        title: "Correo de recuperación enviado",
        description: "Por favor revisa tu correo para restablecer tu contraseña.",
    });

    router.push("/login");
}

  return (
    <AuthLayout>
      <div className="container relative flex h-screen w-screen flex-col items-center justify-center gap-20">
        {/* Contorno y cuadro amarillo */}
        <div
          style={{ borderColor: "#C09913" }}
          className="border-2 rounded-xl p-8 backdrop-blur-sm bg-black/10 shadow-lg"
        >
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Recuperar Contraseña
              </h1>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputConIcono
                          placeholder="Correo electrónico"
                          icon={
                            <img
                              src="/Usuario_Vector.svg"
                              alt="User Icon"
                              className="w-6 h-6"
                            />
                          }
                          {...field}
                        />
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
                  {isLoading ? "Enviando..." : "Enviar Correo"}
                </Button>
              </form>
            </Form>
            <p className="text-center text-sm text-muted-foreground">
              <Link
                href="/login"
                className="hover:text-brand underline underline-offset-4"
              >
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

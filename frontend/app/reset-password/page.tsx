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
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "La confirmación debe tener al menos 6 caracteres." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"],
});

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState<{ access_token: string | null; refresh_token: string | null }>({ access_token: null, refresh_token: null });
  const [tokenError, setTokenError] = useState<string | null>(null);

  // Extraer tokens del hash o query string al montar
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    let access_token = null;
    let refresh_token = null;
    // Buscar en hash
    if (window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      access_token = hashParams.get('access_token');
      refresh_token = hashParams.get('refresh_token');
    }
    // Si no están en hash, buscar en query
    if (!access_token || !refresh_token) {
      const searchParams = new URLSearchParams(window.location.search);
      access_token = access_token || searchParams.get('access_token');
      refresh_token = refresh_token || searchParams.get('refresh_token');
    }
    if (!access_token || !refresh_token) {
      setTokenError('El enlace de recuperación no es válido o ha expirado.');
    }
    setTokens({ access_token, refresh_token });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { password } = values;
    const { access_token, refresh_token } = tokens;
    if (!access_token || !refresh_token) {
      toast({
        title: "Token inválido",
        description: "El enlace de recuperación no es válido o ha expirado.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    // Establecer la sesión temporalmente
    const { error: setSessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
    if (setSessionError) {
      toast({
        title: "Error de sesión",
        description: setSessionError.message,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    // Actualizar la contraseña
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);
    if (error) {
      toast({
        title: "Error al restablecer la contraseña",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Contraseña restablecida",
      description: "Tu contraseña ha sido actualizada exitosamente.",
    });
    router.push("/login");
  }

  return (
    <AuthLayout>
      <div className="container relative flex h-screen w-screen flex-col items-center justify-center gap-20">
        <div className="border-2 rounded-xl p-8 backdrop-blur-sm bg-black/10 shadow-lg" style={{ borderColor: "#C09913" }}>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Restablecer Contraseña
              </h1>
            </div>
            {tokenError ? (
              <div className="text-red-500 text-center font-semibold py-4">{tokenError}</div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Button
                    type="submit"
                    className="w-full bg-[#C09913] hover:bg-[#b58a10] text-white text-xl rounded-2x1 py-4"
                    disabled={isLoading}
                  >
                    {isLoading ? "Restableciendo..." : "Restablecer Contraseña"}
                  </Button>
                </form>
              </Form>
            )}
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="hover:text-brand underline underline-offset-4">
                Volver a inicio de sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
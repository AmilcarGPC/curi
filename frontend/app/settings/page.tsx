"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { PageTransition } from "@/components/ui/page-transition"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  
  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Configuraciones</h1>
          <p className="text-muted-foreground">
            Administra las configuraciones de la aplicación.
          </p>
        </div>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Apariencia</TabsTrigger>
            <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>
                  Configuraciones generales de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="academic-period" className="text-base">Periodo académico</Label>
                    <p className="text-sm text-muted-foreground">
                      Configura el periodo académico actual
                    </p>
                  </div>
                  <div>
                    <select
                      id="academic-period"
                      className="px-3 py-2 rounded-md border"
                      defaultValue="1"
                    >
                      <option value="1">1er Trimestre</option>
                      <option value="2">2do Trimestre</option>
                      <option value="3">3er Trimestre</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch id="auto-save" />
                  <Label htmlFor="auto-save">Guardar automáticamente</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Apariencia</CardTitle>
                <CardDescription>
                  Personaliza la apariencia de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="dark-mode" />
                  <Label htmlFor="dark-mode">Modo oscuro</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura las notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications">Notificaciones por correo</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button 
            disabled={loading}
            onClick={() => {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
              }, 1000)
            }}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </div>
      </div>
    </PageTransition>
  )
}
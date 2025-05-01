import { useRouter } from "next/router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
    router.push("/auth/login")
  }

  return (
    <Button onClick={handleLogout} disabled={loading} variant="outline">
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </Button>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const isMobile = useIsMobile()
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-[60px] items-center justify-between bg-[#07346B] border-b-4 border-[#C09913] shadow-md px-0">
      {/* Logo a la izquierda */}
      <div className="flex items-center h-full px-6 min-w-[220px]">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-white font-extrabold text-2xl tracking-widest">PRIMAUADY</span>
        </Link>
      </div>

      {/* Search bar centrado */}
      <div className="flex-1 flex justify-center items-center h-full">
        <form className="w-full max-w-xl flex justify-center">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="¿Qué deseas encontrar?"
              className="w-full rounded-full bg-white text-black px-12 py-2 shadow focus:outline-none focus:ring-2 focus:ring-[#C09913] border-none text-base transition-all duration-150 placeholder:text-[#07346B]/70"
              aria-label="Buscar"
              style={{ boxShadow: '0 2px 8px 0 rgba(7,52,107,0.08)' }}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#07346B]" />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#07346B] text-xl font-bold focus:outline-none">×</button>
          </div>
        </form>
      </div>

      {/* Notificación y avatar a la derecha */}
      <div className="flex items-center gap-4 h-full px-6 min-w-[120px] justify-end">
        <Button variant="ghost" size="icon" className="relative h-8 w-8 focus-visible-ring">
          <Bell className="h-5 w-5 text-white" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full border-2 border-[#07346B] bg-white flex items-center justify-center">
            <span className="block w-2 h-2 bg-red-600 rounded-full"></span>
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full focus-visible-ring">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  )
}

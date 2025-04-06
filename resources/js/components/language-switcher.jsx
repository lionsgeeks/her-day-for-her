"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"



export function LanguageSwitcher({ isScrolled = true }) {
  const [language, setLanguage] = useState("English")
  let google_translate_element = document.querySelector("#google_translate_element")



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={isScrolled ? "" : "text-white hover:bg-white/10"}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Français")}>Français</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("Español")}>Español</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("العربية")}>العربية</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


  )
}


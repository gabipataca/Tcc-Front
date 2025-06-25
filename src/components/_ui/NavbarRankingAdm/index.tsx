"use client"

import { useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { Menu } from "lucide-react"
import Button from "@/components/_ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/Sheet"
import { Home, Users, FileText, UsersRound, Settings, HelpCircle, CheckCircle } from "lucide-react"
import type { ReactNode } from "react"

type Props = {
  children: ReactNode
}

export default function NavRanking({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#", label: "Home-Ranking", icon: Home },
    { href: "#", label: "Usuários", icon: Users },
    { href: "#", label: "Logs", icon: FileText },
    { href: "#", label: "Gerenciar Equipes", icon: UsersRound },
    { href: "#", label: "Configurações", icon: Settings },
    { href: "#", label: "Dúvidas", icon: HelpCircle },
    { href: "#", label: "Correção", icon: CheckCircle },
  ]

  return (
    <div className="flex flex-col max-h-screen bg-gray-200">
      {/* Navbar */}
      <div className="bg-[#4F85A6] text-white shadow-lg">
        <div className="flex flex-col max-h-screen">
          <div className="flex justify-between items-center h-14">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <div key={link.label} className="flex items-center">
                  <a
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 text-xl font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </a>
                  {index < navLinks.length - 1 && <span className="text-white/60 mx-1">|</span>}
                </div>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-[#4F85A6] text-white border-none">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-3 text-lg font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md px-3 py-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <div className="text-lg font-semibold lg:hidden">Ranking System</div>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 ml-auto lg:ml-0"
            >
              <FaSignOutAlt size={20} />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <main className="flex-1 p-4 flex overflow-auto">{children}</main>
    </div>
  )
}

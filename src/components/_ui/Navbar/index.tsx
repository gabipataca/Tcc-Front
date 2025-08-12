"use client"

import { FC, useState } from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { Menu } from "lucide-react"
import Button from "@/components/_ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/Sheet"
import { NavbarLinks } from "./constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  console.log(pathname)

  // Admin
  // Criar maratona
  // Criar exercicio
  // Editar maratona
  // Criar inscricao
  // Professores
  // Alunos

  return (
    <div className="bg-[#4F85A6] text-white shadow-lg">
      <div className="flex flex-col max-h-screen">
        <div className="flex justify-between items-center h-16">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NavbarLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <Link
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-xl font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md"
                >
                  {link.Icon && <link.Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
                {index < NavbarLinks.length - 1 && <span className="text-white/60 mx-1">|</span>}
              </div>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center justify-between w-full">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#4F85A6] text-white border-none">
                <div className="flex flex-col space-y-4 mt-8">
                  {NavbarLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="flex items-center gap-3 text-lg font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md px-3 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.Icon && <link.Icon className="h-5 w-5" />}
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="text-lg font-semibold lg:hidden">Sistema</div>
          </div>

          {/* Logout Button */}
          <Button
            className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 ml-auto lg:ml-0"
          >
            <FaSignOutAlt size={20} />
            <span className="sr-only">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
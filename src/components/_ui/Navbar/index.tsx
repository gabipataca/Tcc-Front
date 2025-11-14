"use client";

import { FC, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Menu } from "lucide-react";
import Button from "@/components/_ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/Sheet";
import { DialogTitle } from "@radix-ui/react-dialog";

const Navbar: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Admin
    // Criar maratona
    // Criar exercicio
    // Editar maratona
    // Criar inscricao
    // Professores
    // Alunos

    return (
        <div className="bg-[#4F85A6] text-white shadow-lg">
            <div className="flex flex-col max-h-[64px]">
                <div className="flex justify-between items-center h-16">
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1"></nav>

                    {/* Mobile Navigation */}
                    <div className="lg:hidden flex items-center justify-between w-full">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="text-white hover:bg-white/10"
                                >
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Abrir menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                title="dsdss"
                                side="left"
                                className="bg-[#4F85A6] text-white border-none"
                            >
                                <DialogTitle
                                    title="Menu"
                                    className="text-2xl font-bold mb-4"
                                />
                                <div className="flex flex-col space-y-4 mt-8"></div>
                            </SheetContent>
                        </Sheet>

                        <div className="text-lg font-semibold lg:hidden">
                            Sistema
                        </div>
                    </div>

                    {/* Logout Button */}
                    <Button
                        className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 ml-auto lg:ml-0"
                        type="link"
                        linkHref="/logout"
                    >
                        <FaSignOutAlt className="fill-white" size={20} />
                        <span className="sr-only">Sair</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

"use client";

import React from "react";
import { CheckCircle } from "lucide-react";


interface SuccessModalProps {
    open: boolean; 
    onClose: () => void; 
    title: string;
    message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
    open,
    onClose,
    title,
    message,
}) => {
    // Se não estiver 'open', não renderiza nada
    if (!open) {
        return null;
    }

    return (
        // Fundo escuro (overlay)
        <div
            onClick={onClose} // Fecha o modal ao clicar fora
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
            {/* Conteúdo do Modal */}
            <div
                onClick={(e) => e.stopPropagation()} // Impede que o clique dentro feche o modal
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            >
                {/* Header com ícone e título */}
                <div className="flex flex-col items-center justify-center text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mb-4" />
                    <h3 className="text-2xl font-semibold text-slate-900">
                        {title}
                    </h3>
                </div>

                {/* Mensagem */}
                <p className="mt-2 text-center text-lg text-slate-600">
                    {message}
                </p>

                {/* Botão de Fechar */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full rounded-lg bg-[#4F85A6] px-4 py-3 text-lg font-medium text-white transition hover:bg-[#3C6B88] focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:ring-offset-2"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};
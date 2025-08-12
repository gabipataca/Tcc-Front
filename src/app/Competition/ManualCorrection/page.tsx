"use client";

import React from "react";
import NavbarRankingAdm from "@/components/_ui/NavbarRankingAdm";
import { Card, CardContent } from "@/components/_ui/Card";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Download, Check, X, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/_ui/Dialog";
import { Textarea } from "@/components/_ui/Textarea";
import Label from "@/components/_ui/Label";
import useManualCorrection from "./hooks/useManualCorrection";

export default function ManualCorrection() {
    const {
        submissions,
        selectedSubmission,
        feedback,
        setFeedback,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        handleApprove,
        handleDownload,
        getStatusBadge,
        totalPages,
        currentSubmissions,
        handleOpenRejectDialog,
        handleCloseRejectDialog,
        handleConfirmReject,
    } = useManualCorrection();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + currentSubmissions.length;

    return (
        <NavbarRankingAdm>
            <div className="w-full bg-gray-100 min-h-full p-4">
                <div className="max-w-7xl mx-auto">
                    {/* Título da página */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-[#4F85A6] mb-2">Correção Manual de Exercícios</h1>
                        <p className="text-gray-600">Revise e avalie manualmente as submissões dos exercícios das equipes</p>
                    </div>

                    {/* Tabela de submissões */}
                    <Card className="shadow-lg">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[#4F85A6] hover:bg-[#4F85A6]">
                                            <TableHead className="text-white font-semibold text-center min-w-[150px]">
                                                Nome do Grupo
                                            </TableHead>
                                            <TableHead className="text-white font-semibold text-center min-w-[180px]">
                                                Horário de Envio
                                            </TableHead>
                                            <TableHead className="text-white font-semibold text-center min-w-[120px]">Status</TableHead>
                                            <TableHead className="text-white font-semibold text-center min-w-[150px]">Tipo de Erro</TableHead>
                                            <TableHead className="text-white font-semibold text-center min-w-[150px]">Arquivo</TableHead>
                                            <TableHead className="text-white font-semibold text-center min-w-[200px]">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {currentSubmissions.map((submission) => (
                                            <TableRow key={submission.id} className="hover:bg-gray-50">
                                                <TableCell className="text-center font-medium text-lg">{submission.groupName}</TableCell>
                                                <TableCell className="text-center text-lg">{submission.submissionTime}</TableCell>
                                                <TableCell className="text-center">{getStatusBadge(submission.status)}</TableCell>
                                                <TableCell className="text-center text-lg">
                                                    {submission.errorType ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                                            <span className="text-red-600">{submission.errorType}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400">-</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <ButtonAdm
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDownload(submission.fileUrl, submission.fileName)}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        {submission.fileName}
                                                    </ButtonAdm>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {submission.status === "pending" && (
                                                            <>
                                                                <ButtonAdm
                                                                    size="sm"
                                                                    onClick={() => handleApprove(submission.id)}
                                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                                >
                                                                    <Check className="h-4 w-4 mr-1" />
                                                                    Aprovar
                                                                </ButtonAdm>
                                                                <Dialog open={selectedSubmission?.id === submission.id} onOpenChange={(open) => !open && handleCloseRejectDialog()}>
                                                                    <DialogTrigger asChild>
                                                                        <ButtonAdm
                                                                            size="sm"
                                                                            variant="destructive"
                                                                            onClick={() => handleOpenRejectDialog(submission)}
                                                                        >
                                                                            <X className="h-4 w-4 mr-1" />
                                                                            Reprovar
                                                                        </ButtonAdm>
                                                                    </DialogTrigger>
                                                                    <DialogContent>
                                                                        <DialogHeader>
                                                                            <DialogTitle>Reprovar Exercício</DialogTitle>
                                                                            <DialogDescription>
                                                                                Informe o motivo da reprovação para o grupo {selectedSubmission?.groupName}
                                                                            </DialogDescription>
                                                                        </DialogHeader>
                                                                        <div className="space-y-4">
                                                                            <div>
                                                                                <Label htmlFor="error-type">Tipo de Erro</Label>
                                                                                <Textarea
                                                                                    id="error-type"
                                                                                    placeholder="Ex: Erro de sintaxe, lógica incorreta, timeout..."
                                                                                    value={feedback}
                                                                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFeedback(e.target.value)}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <DialogFooter>
                                                                            <ButtonAdm
                                                                                variant="outline"
                                                                                onClick={handleCloseRejectDialog}
                                                                            >
                                                                                Cancelar
                                                                            </ButtonAdm>
                                                                            <ButtonAdm
                                                                                variant="destructive"
                                                                                onClick={handleConfirmReject}
                                                                                disabled={!feedback.trim()}
                                                                            >
                                                                                Reprovar
                                                                            </ButtonAdm>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>
                                                            </>
                                                        )}
                                                        {submission.status !== "pending" && (
                                                            <span className="text-sm text-gray-500">
                                                                {submission.status === "approved" ? "Já aprovado" : "Já reprovado"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Paginação */}
                            <div className="flex items-center justify-between px-6 py-4 border-t">
                                <div className="text-sm text-gray-500">
                                    Mostrando {startIndex + 1} a {Math.min(endIndex, submissions.length)} de {submissions.length}{" "}
                                    submissões
                                </div>
                                <div className="flex items-center gap-2">
                                    <ButtonAdm
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        Anterior
                                    </ButtonAdm>
                                    <span className="text-sm">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <ButtonAdm
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Próxima
                                    </ButtonAdm>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </NavbarRankingAdm>
    );
}
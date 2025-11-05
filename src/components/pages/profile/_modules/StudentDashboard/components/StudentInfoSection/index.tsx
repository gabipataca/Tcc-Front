import React, { useState } from "react";
import { Calendar, Edit, Hash, Mail, UserCheck, Users } from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/_ui/Card";
import { useUser } from "@/contexts/UserContext";
import { User } from "@/types/User";
import EditStudentInfoModal from "./components/EditStudentInfoModal";

// --- Student Information Section Component ---
const StudentInfoSection: React.FC<{
    info?: User;
    onEditClick: () => void;
}> = ({ info, onEditClick }) => (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
        <CardHeader className="pb-4 bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
            <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-5 w-5 text-[#4F85A6]" />
                </div>
                Informações do Aluno
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
            <div className="space-y-4 pl-12">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                        <span className="font-medium text-slate-600 text-xl">
                            Nome Completo
                        </span>
                        <p className="text-slate-900 font-semibold text-lg">
                            {info?.name}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                        <span className="font-medium text-slate-600 text-xl">
                            Data de Ingresso
                        </span>
                        <p className="text-slate-900 font-semibold text-lg">
                            {info?.joinYear}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                        <span className="font-medium text-slate-600 text-xl">
                            E-mail Institucional
                        </span>
                        <p className="text-slate-900 font-semibold text-lg">
                            {info?.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Hash className="h-4 w-4 text-orange-600" />
                    </div>

                    <div>
                        <span className="font-medium text-slate-600 text-xl">
                            Registro Acadêmico
                        </span>
                        <p className="text-slate-900 font-semibold text-lg">
                            {info?.ra}
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <ButtonAdm
                    onClick={onEditClick}
                    className=" text-md bg-[#4F85A6] hover:bg-[#126396] text-white"
                >
                    <Edit className=" h-4 w-4 mr-2" />
                    Editar Informações
                </ButtonAdm>
            </div>
        </CardContent>
    </Card>
);

// --- Componente Principal que Gerencia o Estado ---
const StudentProfile = () => {
    const { user } = useUser();

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    return (
        <>
            <StudentInfoSection
                info={user!}
                onEditClick={() => setEditModalOpen(true)}
            />

            {isEditModalOpen && user && (
                <EditStudentInfoModal
                    onClose={() => setEditModalOpen(false)}
                    currentUser={user}
                />
            )}
        </>
    );
};

export default StudentProfile;

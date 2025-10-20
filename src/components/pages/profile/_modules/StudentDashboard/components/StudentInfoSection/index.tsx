import React, { useState, useEffect } from "react";
import { Calendar, Edit, Hash, Mail, UserCheck, Users, X } from "lucide-react";
import { ButtonAdm } from "@/components/_ui/ButtonAdm";
import { useUser } from "@/contexts/UserContext";
import { User } from "@/types/User";

// --- Componentes de UI Falsos (Mock) ---
// Para que este código seja executável, adicionei versões simples dos seus componentes de UI.
// Substitua estes pelos seus componentes reais de "@/components/_ui/..."

const Card = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div
        className={`rounded-xl border bg-white text-slate-900 shadow-sm ${className}`}
    >
        {children}
    </div>
);
const CardHeader = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
        {children}
    </div>
);
const CardTitle = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <h3
        className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
        {children}
    </h3>
);
const CardContent = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => <div className={`p-6 pt-0 ${className}`}>{children}</div>;
const CardFooter = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({
    children,
    className = "",
    style = "primary",
    size = "md",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    style?: string;
    size?: string;
    [key: string]: any;
}) => {
    const baseStyle =
        "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const styles: { [key: string]: string } = {
        primary: "bg-[#4F85A6] text-white hover:bg-[#3C6B88]",
        outline:
            "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900",
    };
    const sizes: { [key: string]: string } = {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
    };
    return (
        <button
            className={`${baseStyle} ${styles[style]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
const Input = ({
    className = "",
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        className={`flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);
const Label = ({
    children,
    className = "",
    ...props
}: {
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}) => (
    <label
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
        {...props}
    >
        {children}
    </label>
);

// --- Modal para Editar Informações do Aluno ---
const EditStudentInfoModal = ({
    isOpen,
    onClose,
    onSave,
    currentUser,
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<User>) => void;
    currentUser: User | null;
}) => {
    const [name, setName] = useState(currentUser?.name || "");
    const [joinYear, setJoinYear] = useState(currentUser?.joinYear || "");

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setJoinYear(currentUser.joinYear);
        }
    }, [currentUser, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, joinYear });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Edit /> Editar Informações
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="studentName">Nome Completo</Label>
                            <Input
                                id="studentName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="studentJoinYear">
                                Data de Nascimento
                            </Label>
                            <Input
                                id="studentJoinYear"
                                type="text"
                                placeholder="DD/MM/AAAA"
                                value={joinYear}
                                onChange={(e) => setJoinYear(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>E-mail Institucional</Label>
                            <p className="text-sm text-slate-500 bg-slate-100 p-2 rounded-md">
                                {currentUser?.email} (não editável)
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label>Registro Acadêmico (RA)</Label>
                            <p className="text-sm text-slate-500 bg-slate-100 p-2 rounded-md">
                                {currentUser?.ra} (não editável)
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <ButtonAdm
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        >
                            Cancelar
                        </ButtonAdm>

                        <ButtonAdm
                            type="submit"
                            variant="primary"
                            className="bg-[#4F85A6] hover:bg-[#126396] text-white"
                        >
                            Salvar
                        </ButtonAdm>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

// --- Componente da Seção de Informações do Aluno (do seu código) ---
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
                            Data de Nascimento
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

    // Simulação dos dados iniciais do aluno
    const [studentInfo, setStudentInfo] = useState<User>({
        id: "student-01",
        name: "Ana Silva",
        joinYear: "15/08/2002",
        email: "ana.silva@institucional.com",
        ra: "12345678",
    });

    const [isEditModalOpen, setEditModalOpen] = useState(false);

    // Função para salvar os dados do modal
    const handleSaveInfo = (updatedData: Partial<User>) => {
        setStudentInfo((prevInfo) => ({ ...prevInfo, ...updatedData }));
        console.log("Informações salvas:", updatedData);
        // Aqui você faria a chamada para sua API para salvar os dados
    };

    return (
        <>
            <StudentInfoSection
                info={user}
                onEditClick={() => setEditModalOpen(true)}
            />

            <EditStudentInfoModal
                isOpen={isEditModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveInfo}
                currentUser={user!}
            />
        </>
    );
};

export default StudentProfile;

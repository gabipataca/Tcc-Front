import Button from "@/components/_ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/_ui/Card";
import { User } from "@/types/User";

    const StudentInfoSection: React.FC<{ info: User }> = ({ info }) => (
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
            <CardHeader className="pb-4 bg-gradient-to-r from-[#4F85A6]/5 to-[#3C6B88]/5 rounded-t-lg">
                <CardTitle className="text-2xl text-[#4F85A6] flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4F85A6]/10 rounded-full flex items-center justify-center">
         
                        <div className="h-5 w-5 bg-gray-400 rounded-full" />
                    </div>
                    Informações do Aluno
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
                <div className="space-y-4 pl-12">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                 
                            <div className="h-4 w-4 bg-blue-600 rounded-full" />
                        </div>
                        <div>
                            <span className="font-medium text-slate-600 text-2xl">
                                Nome Completo
                            </span>
                            <p className="text-slate-900 font-semibold text-xl">
                                {info?.name}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">

                            <div className="h-4 w-4 bg-purple-600 rounded-full" />
                        </div>
                        <div>
                            <span className="font-medium text-slate-600 text-2xl">
                                Data de Nascimento
                            </span>
                            <p className="text-slate-900 font-semibold text-xl">
                                {info?.joinYear}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">

                            <div className="h-4 w-4 bg-green-600 rounded-full" />
                        </div>
                        <div>
                            <span className="font-medium text-slate-600 text-2xl">
                                E-mail Institucional
                            </span>
                            <p className="text-slate-900 font-semibold  text-xl">
                                {info?.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-100/50 transition-colors">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">

                            <div className="h-4 w-4 bg-orange-600 rounded-full" />
                        </div>
                        <div>
                            <span className="font-medium text-slate-600 text-2xl">
                                Registro Acadêmico
                            </span>
                            <p className="text-slate-900 font-semibold text-xl">
                                {info?.ra}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="button"
                        style="outline"
                        size="sm"
                        className=" text-xl text-[#4F85A6] border-[#4F85A6]/20 hover:bg-[#4F85A6]/5 hover:border-[#4F85A6]/40 transition-all duration-200"
                    >

                        <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full" />
                        Editar Informações
                    </Button>
                </div>
            </CardContent>
        </Card>
    );

    export default StudentInfoSection;
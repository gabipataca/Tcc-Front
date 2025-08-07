import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/Avatar"
import { Badge } from "@/components/_ui/Badge"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/Card"
import { Checkbox } from "@/components/_ui/Checkbox"
import Input from "@/components/_ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm"
import { Download, Edit, Search, Trash2 } from "lucide-react"
import DeleteConfirmDialog from "../DeleteConfirmDialog"
import { FC } from "react"
import useStudentsTable from "./hooks/useStudentsTable"

const StudentsTable: FC = () => {
  const {
    selectedStudents,
    searchTerm,
    statusFilter,
    deleteDialog,
    filteredStudents,
    setSearchTerm,
    setStatusFilter,
    setDeleteDialog,
    handleSelectAll,
    handleSelectStudent,
  } = useStudentsTable();

  return (
    <Card className="bg-white border-[#e9edee] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl text-[#3f3c40]">Gerenciar Alunos</CardTitle>
            <CardDescription className="text-xl text-[#4F85A6]">Lista completa de alunos cadastrados</CardDescription>
          </div>
          <div className="flex gap-2">
            <ButtonAdm
              variant="outline"
              size="sm"
              className="border-[#4F85A6] text-[#4F85A6] hover:bg-[#9abbd6] hover:text-white bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </ButtonAdm>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          {" "}
          {/* Ajustado de mt-4 para mt-2 */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F85A6] w-5 h-5" />
            <Input
              placeholder="Buscar por nome ou grupo..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border-[#e9edee] text-base">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedStudents.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-[#9abbd6] bg-opacity-20 rounded-lg border border-[#9abbd6]">
            <span className="text-lg text-[#3f3c40] font-medium">
              {selectedStudents.length} aluno(s) selecionado(s)
            </span>
            <ButtonAdm className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir Selecionados
            </ButtonAdm>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-0">
        {" "}
        {/* Removido o padding padrão do CardContent para a tabela */}
        <div className="rounded-md border border-[#e9edee]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                <TableHead className="w-12 text-base text-[#3f3c40] px-2">
                  {" "}
                  {/* Ajustado tamanho do texto */}
                  <Checkbox
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-[#4F85A6] data-[state=checked]:bg-[#4F85A6]"
                  />
                </TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[19%]">Aluno</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[10%]">RA</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[20%]">Grupo</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[16%]">Status</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[20%]">Data de Ingresso</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
                <TableHead className="text-right text-lg text-[#3f3c40] font-semibold w-[10%]">Ações</TableHead>{" "}
                {/* Ajustado para text-lg e largura */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-[#e9edee] hover:bg-opacity-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                      className="border-[#4F85A6] data-[state=checked]:bg-[#4F85A6]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                        <AvatarFallback className="bg-[#9abbd6] text-white text-base">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-base text-[#3f3c40]">{student.name}</div>
                        <div className="text-sm text-[#4F85A6]">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-base text-[#3f3c40]">{student.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10"
                    >
                      {student.group}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === "active" ? "default" : "secondary"}
                      className={
                        student.status === "active"
                          ? "bg-[#4F85A6] text-white hover:bg-[#3f3c40] text-base"
                          : "bg-[#e9edee] text-[#3f3c40] text-base"
                      }
                    >
                      {student.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-base text-[#3f3c40]">
                    {new Date(student.joinDate).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ButtonAdm variant="ghost" size="sm" className="hover:bg-[#e9edee] text-[#4F85A6]">
                        <Edit className="w-5 h-5" />
                      </ButtonAdm>
                      <ButtonAdm
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-50 text-red-500"
                        onClick={() => setDeleteDialog({ isOpen: true, student })}
                      >
                        <Trash2 className="w-5 h-5" />
                      </ButtonAdm>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, student: null })}
        onConfirm={() => {
          // Handle delete logic here
          setDeleteDialog({ isOpen: false, student: null })
        }}
        itemName={deleteDialog.student?.name}
        itemType="o aluno"
      />
    </Card>
  )
}

export default StudentsTable;
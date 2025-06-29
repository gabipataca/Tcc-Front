"use client"

import type React from "react"

import { useState } from "react"
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa"
import { Search, Users, UserCheck, Download, Edit, Trash2, Menu } from "lucide-react"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import  Input from "@/components/_ui/Input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/_ui/Card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/_ui/TableAdm"
import { Badge } from "@/components/_ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/Select"
import { Checkbox } from "@/components/_ui/Checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/Avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/_ui/Tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/Sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/_ui/Dialog"
import { Home, UserPlus, BookOpen, Trophy, BarChart3, Medal, HelpCircle } from "lucide-react"

// Mock data
const studentsData = [
  {
    id: 123,
    name: "João Silva",
    group: "Bit Busters",
    email: "joao@email.com",
    status: "active",
    joinDate: "2024-01-15",
  },
  {
    id: 456,
    name: "Maria Souza",
    group: "Bug Hunters",
    email: "maria@email.com",
    status: "active",
    joinDate: "2024-01-20",
  },
  {
    id: 789,
    name: "Carlos Lima",
    group: "Error 404",
    email: "carlos@email.com",
    status: "inactive",
    joinDate: "2024-02-01",
  },
  {
    id: 101,
    name: "Ana Costa",
    group: "Code Warriors",
    email: "ana@email.com",
    status: "active",
    joinDate: "2024-02-10",
  },
  {
    id: 112,
    name: "Pedro Santos",
    group: "Bit Busters",
    email: "pedro@email.com",
    status: "active",
    joinDate: "2024-02-15",
  },
]

const groupsData = [
  {
    id: 1,
    name: "Bit Busters",
    members: 5,
    status: "active",
    lastCompetition: "2024-03-15",
  },
  {
    id: 2,
    name: "Bug Hunters",
    members: 4,
    status: "active",
    lastCompetition: "2024-03-10",
  },
  {
    id: 3,
    name: "Error 404",
    members: 3,
    status: "inactive",
    lastCompetition: "2024-02-28",
  },
  {
    id: 4,
    name: "Code Warriors",
    members: 6,
    status: "active",
    lastCompetition: "2024-03-20",
  },
]

// Components
interface StatsCardProps {
  title: string
  value: number
  description: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  trend?: number
}

const StatsCard = ({ title, value, description, icon: Icon, trend }: StatsCardProps) => (
  <Card className="bg-white border-[#e9edee] shadow-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
      <CardTitle className="text-xl font-medium text-[#3f3c40]">{title}</CardTitle>
      <Icon className="h-5 w-5 text-[#4F85A6]" />
    </CardHeader>
    <CardContent className="px-4 pb-4">
      <div className="text-3xl font-bold text-[#3f3c40]">{value}</div>
      <p className="text-sm text-[#4F85A6]">
        {trend && <span className="text-[#4F85A6] font-semibold">+{trend}%</span>} {description}
      </p>
    </CardContent>
  </Card>
)

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  itemName?: string
  itemType: string
}

const DeleteConfirmDialog = ({ isOpen, onClose, onConfirm, itemName, itemType }: DeleteConfirmDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white border-[#e9edee]">
      <DialogHeader>
        <DialogTitle className="text-2xl text-[#3f3c40]">Confirmar Exclusão</DialogTitle>
        <DialogDescription className="text-xl text-[#4F85A6]">
          Tem certeza que deseja excluir {itemType} &quot;{itemName}&quot;? Esta ação não pode ser desfeita.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <ButtonAdm
          variant="outline"
          onClick={onClose}
          className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee] bg-transparent"
        >
          Cancelar
        </ButtonAdm>
        <ButtonAdm onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white">
          <Trash2 className="w-4 h-4 mr-2" />
          Excluir
        </ButtonAdm>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

const AppSidebar = () => {
  return (
    <div className="w-[280px] bg-[#4F85A6] flex flex-col items-center py-6 shadow-xl relative min-h-screen">
      <div className="mb-8">
        <div className="w-20 h-20 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">FHO</span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <FaUserCircle size={120} className="text-white drop-shadow-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        <h2 className="text-white text-xl font-semibold mb-2 drop-shadow-sm">Perfil Usuário</h2>
        <p className="text-white/90 text-sm">E-mail Institucional</p>
      </div>

      <div className="mt-auto mb-6">
        <div className="w-32 h-10 bg-white/10 rounded flex items-center justify-center">
          <span className="text-white font-semibold">FALCON</span>
        </div>
      </div>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "#", label: "Home", icon: Home },
    { href: "#", label: "Inscrições", icon: UserPlus },
    { href: "#", label: "Montar Exercícios", icon: BookOpen },
    { href: "#", label: "Criar Maratona", icon: Trophy },
    { href: "#", label: "Estatísticas", icon: BarChart3 },
    { href: "#", label: "Ranking", icon: Medal },
    { href: "#", label: "Dúvidas", icon: HelpCircle },
  ]

  return (
    <div className="bg-[#4F85A6] text-white shadow-lg">
      <div className="flex flex-col max-h-screen">
        <div className="flex justify-between items-center h-16 px-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <div key={link.label} className="flex items-center">
                <a
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-200 rounded-md"
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
                <ButtonAdm variant="ghost" className="text-white hover:bg-white/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </ButtonAdm>
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

            <div className="text-lg font-semibold lg:hidden">Sistema Admin</div>
          </div>

        
          <ButtonAdm
            variant="ghost"
            className="text-white hover:bg-white/10 hover:text-white transition-all duration-200 ml-auto lg:ml-0"
          >
            <FaSignOutAlt size={20} />
            <span className="sr-only">Sair</span>
          </ButtonAdm>
        </div>
      </div>
    </div>
  )
}

const StudentsTable = () => {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; student: (typeof studentsData)[0] | null }>({
    isOpen: false,
    student: null,
  })

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.group.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleSelectAll = (checked: boolean) => {
    setSelectedStudents(checked ? filteredStudents.map((s) => s.id) : [])
  }

  const handleSelectStudent = (studentId: number, checked: boolean) => {
    setSelectedStudents((prev) => (checked ? [...prev, studentId] : prev.filter((id) => id !== studentId)))
  }

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
        <div className="rounded-md border border-[#e9edee]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                <TableHead className="w-12 text-base text-[#3f3c40] px-2">
                  <Checkbox
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-[#4F85A6] data-[state=checked]:bg-[#4F85A6]"
                  />
                </TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[19%]">Aluno</TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[10%]">RA</TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[20%]">Grupo</TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[16%]">Status</TableHead>
                <TableHead className="text-lg text-[#3f3c40] font-semibold w-[20%]">Data de Ingresso</TableHead>
                <TableHead className="text-right text-lg text-[#3f3c40] font-semibold w-[10%]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-[#e9edee] hover:bg-opacity-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked: boolean) => handleSelectStudent(student.id, checked)}
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

const GroupsTable = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredGroups = groupsData.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || group.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <Card className="bg-white border-[#e9edee] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl text-[#3f3c40]">Gerenciar Grupos</CardTitle>
            <CardDescription className="text-xl text-[#4F85A6]">Lista de grupos e última competição</CardDescription>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4F85A6] w-5 h-5" />
            <Input
              placeholder="Buscar grupo..."
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
      </CardHeader>

      <CardContent className="p-0">
        <div className="rounded-md border border-[#e9edee]">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#e9edee] hover:bg-[#e9edee]">
                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">Grupo</TableHead>
                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">Membros</TableHead>
                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[20%]">Status</TableHead>
                <TableHead className="text-xl text-[#3f3c40] font-semibold w-[17%]">Última Competição</TableHead>
                <TableHead className="text-right text-xl text-[#3f3c40] font-semibold w-[7%]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGroups.map((group) => (
                <TableRow key={group.id} className="hover:bg-[#e9edee] hover:bg-opacity-50">
                  <TableCell className="font-medium text-base text-[#3f3c40]">{group.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-[#9abbd6] text-base text-[#4F85A6] bg-[#9abbd6] bg-opacity-10"
                    >
                      {group.members} membros
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={group.status === "active" ? "default" : "secondary"}
                      className={
                        group.status === "active"
                          ? "bg-[#4F85A6] text-white hover:bg-[#3f3c40] text-base"
                          : "bg-[#e9edee] text-[#3f3c40] text-base"
                      }
                    >
                      {group.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-base text-[#3f3c40]">
                    {new Date(group.lastCompetition).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <ButtonAdm variant="ghost" size="sm" className="hover:bg-[#e9edee] text-[#4F85A6]">
                        <Edit className="w-5 h-5" />
                      </ButtonAdm>
                      <ButtonAdm variant="ghost" size="sm" className="hover:bg-red-50 text-red-500">
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
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#e9edee]">
      <Navbar />

      <div className="flex">
        <AppSidebar />

        <div className="flex-1">
          <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#3f3c40] py-2">Dashboard Administrativo</h1>
                <p className="text-lg text-[#4F85A6]">Gerencie alunos e grupos</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatsCard
                title="Total de Alunos"
                value={studentsData.length}
                description="Ativos no ultimo mês"
                icon={Users}
              />
              <StatsCard
                title="Grupos Ativos"
                value={groupsData.filter((g) => g.status === "active").length}
                description="Ativos no ultimo mês"
                icon={UserCheck}
              />
            </div>

            {/* Main Content */}
            <Tabs defaultValue="students" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-[#e9edee]">
                <TabsTrigger
                  value="students"
                  className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-1 py-0.5"
                >
                  Alunos
                </TabsTrigger>
                <TabsTrigger
                  value="groups"
                  className="data-[state=active]:bg-[#4F85A6] data-[state=active]:text-white text-base text-[#3f3c40] px-3 py-0.5"
                >
                  Grupos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-0 mt-0">
                <StudentsTable />
              </TabsContent>

              <TabsContent value="groups" className="space-y-0 mt-0">
                <GroupsTable />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

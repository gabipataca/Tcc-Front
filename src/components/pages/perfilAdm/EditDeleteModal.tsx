import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/_ui/Dialog"
import { ButtonAdm } from "@/components/_ui/ButtonAdm"
import { Trash2, Edit } from "lucide-react"
import { useState, useEffect } from "react"
import Input from "@/components/_ui/Input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/_ui/Select"
import { Student, Professor, Group } from "./mockData"

interface EditDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (updatedItem?: Student | Professor | Group) => void
  item?: Student | Professor | Group | null
  itemType: string
  mode: "edit" | "delete"
}

export const EditDeleteModal = ({ isOpen, onClose, onConfirm, item, itemType, mode }: EditDeleteModalProps) => {
  const [formData, setFormData] = useState<Student | Professor | Group | undefined>(item)

  useEffect(() => {
    setFormData(item ?? undefined)
  }, [item])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => prev ? { ...prev, [name]: value } : undefined)
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => prev ? { ...prev, [name]: value } : undefined)
  }

  const handleSave = () => {
    onConfirm(formData)
  }

  if (mode === "delete") {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white border-[#e9edee]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#3f3c40]">Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-xl text-[#4F85A6]">
              Tem certeza que deseja excluir {itemType} &quot;{item?.name}&quot;? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <ButtonAdm onClick={onClose} className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]">
              Cancelar
            </ButtonAdm>
            <ButtonAdm onClick={() => onConfirm()} className="bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </ButtonAdm>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  // Edit mode
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white border-[#e9edee]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#3f3c40]">Editar {itemType}</DialogTitle>
          <DialogDescription className="text-xl text-[#4F85A6]">
            Altere os dados de {item?.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <label className="text-lg font-medium text-[#3f3c40] block mb-2">Nome</label>
          <Input
            name="name"
            value={formData?.name ?? ""}
            onChange={handleChange}
            placeholder="Nome"
            className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
          />
          {"email" in (formData ?? {}) && (
            <>
              <label className="text-lg font-medium text-[#3f3c40] block mb-2">E-mail</label>
              <Input
                name="email"
                type="email"
                value={(formData as Student | Professor)?.email ?? ""}
                onChange={handleChange}
                placeholder="E-mail"
                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
              />
            </>
          )}
          {"group" in (formData ?? {}) && (
            <>
              <label className="text-lg font-medium text-[#3f3c40] block mb-2">Grupo</label>
              <Input
                name="group"
                value={"group" in (formData ?? {}) ? (formData as any).group ?? "" : ""}
                onChange={handleChange}
                placeholder="Grupo"
                className="border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base"
              />
            </>
          )}
          {"status" in (formData ?? {}) && (
            <>
              <label className="text-lg font-medium text-[#3f3c40] block mb-2">Status</label>
              <Select
                value={(formData as Student | Professor | Group)?.status ?? ""}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger className="w-full border-[#e9edee] focus:border-[#4F85A6] focus:ring-[#4F85A6] text-base">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#e9edee] text-base">
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        </div>
        <DialogFooter>
          <ButtonAdm onClick={onClose} className="border-[#e9edee] text-[#3f3c40] hover:bg-[#e9edee]">
            Cancelar
          </ButtonAdm>
          <ButtonAdm onClick={handleSave} className="bg-[#4F85A6] hover:bg-[#3f3c40] text-white">
            <Edit className="w-4 h-4 mr-2" />
            Salvar
          </ButtonAdm>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
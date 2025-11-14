interface AccessCodeDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newCode: string) => void
  currentCode: string
}
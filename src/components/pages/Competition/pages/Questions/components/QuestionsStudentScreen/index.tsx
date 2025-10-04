"use client"

import type React from "react"
import { useState, type FC } from "react"
import { FaPaperPlane } from "react-icons/fa"
import {
  Box,
  TextField,
  Autocomplete,
  Button as MuiButton,
  Typography,
  Paper,
  InputAdornment,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material"
import BookIcon from "@mui/icons-material/Book"
import CodeIcon from "@mui/icons-material/Code"
import TitleIcon from "@mui/icons-material/Title"
import CloseIcon from "@mui/icons-material/Close"
import { SnackbarProvider, useSnackbar } from "notistack"
import UserQuestions from "./components/UserQuestions";

interface InputFieldProps {
  label: string
  placeholder: string
  icon?: React.ReactNode
}

const InputField = ({ label, placeholder, icon }: InputFieldProps) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
      InputProps={{
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "&.Mui-focused fieldset": {
            borderColor: "#4F85A6",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#4F85A6",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4F85A6",
        },
      }}
    />
  </Box>
)

const TextareaField = () => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      multiline
      rows={5}
      label="Escreva suas dúvidas:"
      placeholder="Digite aqui sua dúvida sobre o exercício..."
      variant="outlined"
      slotProps={{ inputLabel: { shrink: true } }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "&.Mui-focused fieldset": {
            borderColor: "#4F85A6",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#4F85A6",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4F85A6",
        },
      }}
    />
  </Box>
)

interface MuiSelectFieldProps {
  label: string
  options: string[]
  placeholder?: string
  icon?: React.ReactNode
}

const MuiSelectField = ({ label, options, placeholder, icon }: MuiSelectFieldProps) => {
  return (
    <Box sx={{ mb: 4, width: "100%" }}>
      <Autocomplete
        disablePortal
        id={`autocomplete-${label.replace(/\s/g, "-")}`}
        options={options}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder || `Selecione ${label.toLowerCase()}`}
            variant="outlined"
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
              ...params.InputProps,
              startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&.Mui-focused fieldset": {
                  borderColor: "#4F85A6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#4F85A6",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#4F85A6",
              },
            }}
          />
        )}
      />
    </Box>
  )
}

const AskQuestionsContent = ({ onClose }: { onClose: () => void }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    exercise: "",
    language: "",
    title: "",
    question: "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    let errored = false

    try {
      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })

      enqueueSnackbar("Pergunta enviada com sucesso!", {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      })
    } catch (error) {
      errored = true
      enqueueSnackbar("Ocorreu um erro ao enviar a pergunta. Tente novamente.", {
        variant: "error",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      })
    } finally {
      setIsSubmitting(false)
      if (!errored) {
        setTimeout(() => {
          onClose()
          // Reset form
          setFormData({
            exercise: "",
            language: "",
            title: "",
            question: "",
          })
        }, 1500)
      }
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 4,
        px: 2,
        width: "100%",
        flexGrow: 1,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 4, md: 8 },
          borderRadius: 4,
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: "bold",
            color: "#4F85A6",
            mb: 6,
            letterSpacing: "0.05em",
          }}
        >
          Retire suas dúvidas sobre o exercício
        </Typography>

        <MuiSelectField
          label="Escolha o exercício:"
          options={[..."ABCDEFGHIJ"]}
          placeholder="Selecione o exercício"
          icon={<BookIcon sx={{ color: "#4F85A6" }} />}
        />

        <MuiSelectField
          label="Escolha a Linguagem:"
          options={["C", "C++", "C#", "Java", "PHP", "Python"]}
          placeholder="Selecione a linguagem"
          icon={<CodeIcon sx={{ color: "#4F85A6" }} />}
        />

        <InputField
          label="Título da Pergunta:"
          placeholder="Ex: Dúvida sobre o laço for no Exercício A"
          icon={<TitleIcon sx={{ color: "#4F85A6" }} />}
        />

        <TextareaField />

        <MuiButton
          variant="contained"
          endIcon={<FaPaperPlane />}
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            bgcolor: "#4F85A6",
            color: "#fff",
            borderRadius: 8,
            px: 5,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
            mt: 2,
            "&:hover": {
              bgcolor: "#3B6A82",
              transform: "translateY(-2px)",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            },
            "&:disabled": {
              bgcolor: "#ccc",
            },
            transition: "all 0.3s ease-in-out",
          }}
        >
          {isSubmitting ? "Enviando..." : "Enviar Pergunta"}
        </MuiButton>
      </Paper>
    </Box>
  )
}

const QuestionsStudentScreen: FC = () => {
  const [modalAberto, setModalAberto] = useState(false)

  return (
    <>
      <UserQuestions onOpenModal={() => setModalAberto(true)} />

      <Dialog
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <IconButton
          onClick={() => setModalAberto(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#4F85A6",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0 }}>
          <AskQuestionsContent onClose={() => setModalAberto(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}

const QuestionsStudentScreenWithProvider: FC = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <QuestionsStudentScreen />
    </SnackbarProvider>
  )
}

export default QuestionsStudentScreenWithProvider

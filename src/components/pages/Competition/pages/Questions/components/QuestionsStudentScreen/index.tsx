"use client"

import type React from "react"
import { useMemo, useState, type FC } from "react"
import { FaPaperPlane } from "react-icons/fa"
import {
  Box,
  TextField,
  Button as MuiButton,
  Typography,
  Paper,
  InputAdornment,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material"
import TitleIcon from "@mui/icons-material/Title"
import CloseIcon from "@mui/icons-material/Close"
import { useSnackbar } from "notistack"
import UserQuestions from "./components/UserQuestions"
import { useUser } from "@/contexts/UserContext"
import { useCompetitionHub } from "@/contexts/CompetitionHubContext"

interface InputFieldProps {
  label: string
  placeholder: string
  icon?: React.ReactNode
  value: string
  onChange: (value: string) => void
}

const InputField = ({ label, placeholder, icon, value, onChange }: InputFieldProps) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      label={label}
      placeholder={placeholder}
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

interface TextareaFieldProps {
  value: string
  onChange: (value: string) => void
}

const TextareaField = ({ value, onChange }: TextareaFieldProps) => (
  <Box sx={{ mb: 4 }}>
    <TextField
      fullWidth
      multiline
      rows={5}
      label="Escreva suas dúvidas:"
      placeholder="Digite aqui sua dúvida sobre o exercício..."
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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

/* Componente MuiSelectField comentado temporariamente - não está sendo usado no momento
interface MuiSelectFieldProps {
  label: string
  options: string[]
  placeholder?: string
  icon?: React.ReactNode
  value: string | null
  onChange: (value: string | null) => void
}

const MuiSelectField = ({ label, options, placeholder, icon, value, onChange }: MuiSelectFieldProps) => {
  return (
    <Box sx={{ mb: 4, width: "100%" }}>
      <Autocomplete
        disablePortal
        id={`autocomplete-${label.replace(/\s/g, "-")}`}
        options={options}
        value={value}
        onChange={(_, newValue) => onChange(newValue)}
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
*/

const AskQuestionsContent = ({ onClose }: { onClose: () => void }) => {
  const { enqueueSnackbar } = useSnackbar()
  const { user } = useUser()
  const { sendQuestion, ongoingCompetition } = useCompetitionHub()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    exercise: null as string | null,
    language: null as string | null,
    title: "",
    question: "",
  });

    // A => Char Code 65
    const exercisesInCompetition = useMemo(() => {
      const charCodesWithId: Record<string, number> = {};
      const exerciseIds = ongoingCompetition?.exercises?.map((ex) => ex.id) || [];
      exerciseIds.forEach((id, index) => {
        const char = String.fromCharCode(65 + index);
        charCodesWithId[char] = id;
      });
  
      return charCodesWithId;
    }, [ongoingCompetition?.exercises]);

  const handleSubmit = async () => {
    if (!formData.question.trim()) {
      enqueueSnackbar("Por favor, escreva sua pergunta.", {
        variant: "warning",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      })
      return
    }

    if (!user?.group?.id || !ongoingCompetition?.id) {
      enqueueSnackbar("Erro: Dados do usuário ou competição não encontrados.", {
        variant: "error",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      })
      return
    }

    setIsSubmitting(true)
    let errored = false

    try {
      const exerciseId = formData.exercise ? exercisesInCompetition[formData.exercise] : null

      await sendQuestion({
        groupId: user.group.id,
        competitionId: ongoingCompetition.id,
        exerciseId: exerciseId,
        content: formData.question.trim(),
        questionType: 0,
      });

      /*
      enqueueSnackbar("Pergunta enviada com sucesso!", {
        variant: "success",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      */
    } catch {
      errored = true
      enqueueSnackbar("Ocorreu um erro ao enviar a pergunta. Tente novamente.", {
        variant: "error",
        autoHideDuration: 2500,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    } finally {
      setIsSubmitting(false)
      if (!errored) {
        setTimeout(() => {
          onClose()
          // Reset form
          setFormData({
            exercise: null,
            language: null,
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
          Retire suas dúvidas
        </Typography>
        
        {/*}
        <MuiSelectField
          label="Escolha o exercício:"
          options={Object.keys(exercisesInCompetition)}
          placeholder="Selecione o exercício"
          icon={<BookIcon sx={{ color: "#4F85A6" }} />}
          value={formData.exercise}
          onChange={(value) => setFormData((prev) => ({ ...prev, exercise: value }))}
        />

        <MuiSelectField
          label="Escolha a Linguagem:"
          options={["C", "C++", "C#", "Java", "PHP", "Python"]}
          placeholder="Selecione a linguagem"
          icon={<CodeIcon sx={{ color: "#4F85A6" }} />}
          value={formData.language}
          onChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
        />
        */}

        <InputField
          label="Título da Pergunta:"
          placeholder="Ex: Dúvida sobre o laço for no Exercício A"
          icon={<TitleIcon sx={{ color: "#4F85A6" }} />}
          value={formData.title}
          onChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
        />

        <TextareaField
          value={formData.question}
          onChange={(value) => setFormData((prev) => ({ ...prev, question: value }))}
        />

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
      <QuestionsStudentScreen />
  )
}

export default QuestionsStudentScreenWithProvider

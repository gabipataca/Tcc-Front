"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Box, Paper, Typography } from "@mui/material"
import Button from "@/components/_ui/Button"
import { FaUpload, FaPaperPlane, FaDownload } from "react-icons/fa"
import { useCompetitionHub } from "@/contexts/CompetitionHubContext"
import { useUser } from "@/contexts/UserContext"

// Exercícios e linguagens
const exercises = [..."ABCDEFGHIJ"]
const languages = ["C", "C++", "C#", "Go", "Java", "JavaScript", "PHP", "Python"]

const languageExtensions: Record<string, string> = {
  C: "c",
  "C++": "cpp",
  "C#": "cs",
  Go: "go",
  Java: "java",
  JavaScript: "js",
  PHP: "php",
  Python: "py",
}

const languageTemplates: Record<string, string> = {
  C: "template.c",
  "C++": "template.cpp",
  "C#": "template.cs",
  Go: "template.go",
  Java: "template.java",
  JavaScript: "template.js",
  PHP: "template.php",
  Python: "template.py",
}

// Judge0 language IDs
const languageIds: Record<string, number> = {
  C: 50,        // C (GCC 9.2.0)
  "C++": 54,    // C++ (GCC 9.2.0)
  "C#": 51,     // C# (Mono 6.6.0.161)
  Go: 60,       // Go (1.13.5)
  Java: 62,     // Java (OpenJDK 13.0.1)
  JavaScript: 63, // JavaScript (Node.js 12.14.0)
  PHP: 68,      // PHP (7.4.1)
  Python: 71,   // Python (3.8.1)
}

// Hook separado
const useSendExercise = () => {
  const { user } = useUser()
  const { sendExerciseAttempt, ongoingCompetition } = useCompetitionHub()
  const [selectedExercise, setSelectedExercise] = useState<string>(exercises[0])
  const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0])
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleExerciseChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExercise(event.target.value)
  }, [])

  const handleLanguageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value)
  }, [])

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0]
      setFile(selectedFile)
      setAttachedFileName(selectedFile.name)
    }
  }, [])

  const handleDownloadTemplate = useCallback(() => {
    const templateFileName = languageTemplates[selectedLanguage]
    const templatePath = `/teamplate/${templateFileName}`

    const link = document.createElement("a")
    link.href = templatePath
    link.download = templateFileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [selectedLanguage])

  const handleSubmitAnalysis = useCallback(async () => {
    if (!file) {
      alert("Por favor, anexe um arquivo antes de enviar.")
      return
    }

    if (!user?.group?.id || !ongoingCompetition?.id) {
      alert("Erro: Dados do usuário ou competição não encontrados.")
      return
    }

    setIsSubmitting(true)
    try {
      const exerciseId = exercises.indexOf(selectedExercise) + 1
      const languageId = languageIds[selectedLanguage]

      console.log("[analiseJugde] Reading file content for submission...")
      
      // Read file content
      const code = await file.text()

      console.log("[analiseJugde] Submetendo exercício:", {
        groupId: user.group.id,
        competitionId: ongoingCompetition.id,
        exerciseId,
        languageId,
        fileName: file.name,
        codeLength: code.length,
      })

      // Send via SignalR - response will come via ReceiveExerciseAttemptResponse event
      await sendExerciseAttempt({
        groupId: user.group.id,
        competitionId: ongoingCompetition.id,
        exerciseId,
        languageId,
        code,
      })

      // User will be notified automatically by the CompetitionHubContext
      alert(`📤 Submissão enviada! Aguarde o resultado do judge...`)

      setAttachedFileName(null)
      setFile(null)
    } catch (error) {
      console.error("[analiseJugde] Erro ao submeter exercício:", error)
      alert("Ocorreu um erro ao enviar a análise. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }, [file, selectedExercise, selectedLanguage, user, ongoingCompetition, sendExerciseAttempt])

  return {
    selectedExercise,
    handleExerciseChange,
    selectedLanguage,
    handleLanguageChange,
    attachedFileName,
    handleFileChange,
    handleSubmitAnalysis,
    handleDownloadTemplate,
    isSubmitting,
    exercises,
    languages,
  }
}

// Componente principal
const AnaliseJuiz: React.FC = () => {
  const {
    selectedExercise,
    handleExerciseChange,
    selectedLanguage,
    handleLanguageChange,
    attachedFileName,
    handleFileChange,
    handleSubmitAnalysis,
    handleDownloadTemplate,
    isSubmitting,
    exercises,
    languages,
  } = useSendExercise()

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
          Submeter a análise do Juíz
        </Typography>

        <div className="mb-8">
          <label className="block text-gray-700 text-lg mb-2">
            <Typography variant="body1" component="span" sx={{ color: "#4F85A6", fontWeight: "bold" }}>
              Escolha a Linguagem:
            </Typography>
          </label>
          <div className="flex justify-center gap-4 mt-2 items-center">
            <select
              className="border rounded-lg px-4 py-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              disabled={isSubmitting}
            >
              {languages.map((lang: string) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <Button
              className="bg-[#4F85A6] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              onClick={handleDownloadTemplate}
            >
              <FaDownload size={18} /> Baixar Template
            </Button>
          </div>

          <Typography
            variant="body1"
            sx={{
              mt: 3,
              color: "#4F85A6",
              backgroundColor: "#E8F4F8",
              padding: "16px",
              borderRadius: "8px",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            ⚠️ Após editar o template, renomeie o arquivo para o exercício correspondente.
            <br />
            <span style={{ fontSize: "1rem", marginTop: "8px", display: "block" }}>
              Exemplo: Se o exercício for A e a linguagem for {selectedLanguage}, o arquivo deve ser A.
              {languageExtensions[selectedLanguage]}
            </span>
          </Typography>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 text-lg mb-2">
            <Typography variant="body1" component="span" sx={{ color: "#4F85A6", fontWeight: "bold" }}>
              Escolha o exercício:
            </Typography>
          </label>
          <div className="flex justify-center gap-4 mt-2 items-center">
            <select
              className="border rounded-lg px-4 py-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
              value={selectedExercise}
              onChange={handleExerciseChange}
              disabled={isSubmitting}
            >
              {exercises.map((letter: string) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>

            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".c,.cpp,.cs,.go,.java,.js,.php,.py"
            />

            <Button
              className="bg-[#4F85A6] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <FaUpload size={18} /> Anexar arquivo
            </Button>
          </div>
          {attachedFileName && (
            <Typography variant="body2" sx={{ mt: 2, color: "#4F85A6" }}>
              Arquivo anexado: <span className="font-bold">{attachedFileName}</span>
            </Typography>
          )}
        </div>

        {/* Botão enviar */}
        <Button
          className={`bg-[#4F85A6] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-lg flex items-center justify-center mx-auto gap-2${
            isSubmitting || !attachedFileName ? " opacity-50 pointer-events-none" : ""
          }`}
          onClick={handleSubmitAnalysis}
          disabled={isSubmitting || !attachedFileName}
        >
          {isSubmitting ? "Enviando..." : "Enviar"} <FaPaperPlane size={18} />
        </Button>
      </Paper>
    </Box>
  )
}

export default AnaliseJuiz

"use client"

import type React from "react"

interface LabelProps {
  htmlFor?: string
  className?: string
  children: React.ReactNode
}

const Label: React.FC<LabelProps> = ({ htmlFor, className, children }) => {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-2 ${className || ""}`}>
      {children}
    </label>
  )
}

export default Label
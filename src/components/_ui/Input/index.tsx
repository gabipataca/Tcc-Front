"use client"

import type React from "react"
import type { InputProps } from "./types"

const Input: React.FC<InputProps> = ({
  containerClassName,
  className,
  value,
  setValue,
  onBlur,
  placeholder,
  type,
  label,
  icon,
  readOnly,
  name,
  disabled,
  required,
  autocomplete,
  ref,
  error,
  min,
  max,
  id,
  ...otherProps
}) => {
  return (
    <div className={`relative mb-4 ${containerClassName || ""}`}>
      {label && (
        <label htmlFor={id || name} className="block text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div
        className={`flex items-center border rounded-lg transition-all duration-200 ${
          error
            ? "border-red-700 focus-within:ring-2 focus-within:ring-red-700"
            : "border-gray-300 focus-within:ring-2 focus-within:ring-[#4F85A6]"
        } ${disabled ? "bg-gray-50" : "bg-white"}`}
      >
        {icon && <div className="ml-2">{icon}</div>}
        <input
          id={id || name}
          className={`w-full p-3 outline-none bg-transparent rounded-lg ${className || ""}`}
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => (setValue ? setValue(e.target.value) : undefined)}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          ref={ref}
          autoComplete={autocomplete}
          min={min}
          max={max}
          {...otherProps}
        />
      </div>
      {error && <span className="absolute -bottom-6 left-0 text-red-700 text-sm">{error.message}</span>}
    </div>
  )
}

export default Input

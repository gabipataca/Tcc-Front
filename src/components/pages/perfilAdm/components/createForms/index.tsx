
"use client";
import React from "react";
import styles from "./FormFields.module.scss";

// Componente Input
interface InputProps {
  label?: string;
  name?: string;
  value: string;
  setValue: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  value,
  setValue,
  type = "text",
  required,
  placeholder,
  error,
}) => (
  <div className={styles.fieldContainer}>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      id={name}
      name={name}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
      placeholder={placeholder}
      required={required}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Componente TextArea
interface TextAreaProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  error,
}) => (
  <div className={styles.fieldContainer}>
    {label && <label htmlFor={name}>{label}</label>}
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

// Componente Select
interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  name?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  error,
}) => (
  <div className={styles.fieldContainer}>
    {label && <label htmlFor={name}>{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

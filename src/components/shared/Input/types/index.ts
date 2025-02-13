import React, { FocusEvent, HTMLInputAutoCompleteAttribute } from "react";
import { FieldError } from "react-hook-form";

/**
 * Props for the Input component.
 */
export interface InputProps {
    /**
     * The current value of the input.
     */
    value?: string;

    /**
     * Function to update the value of the input.
     */
    setValue?: React.Dispatch<React.SetStateAction<string>>;

    /**
     * Callback function triggered when the input loses focus.
     */
    onBlur?: (e?: FocusEvent) => void;

    /**
     * Placeholder text displayed in the input when it is empty.
     */
    placeholder?: string;

    /**
     * The type of input, e.g., "text", "number", "email", or "password".
     */
    type: "text" | "number" | "email" | "password";

    /**
     * Label text for the input.
     */
    label?: string;

    /**
     * Icon to be displayed inside the input.
     */
    icon?: React.ReactNode;

    /**
     * If true, the input will be read-only.
     */
    readOnly?: boolean;

    /**
     * The name attribute for the input element.
     */
    name: string;

    /**
     * If true, the input will be disabled.
     */
    disabled?: boolean;

    /**
     * The autocomplete attribute for the input element.
     */
    autocomplete?: HTMLInputAutoCompleteAttribute;

    /**
     * Ref callback for the input element.
     */
    ref?: React.RefCallback<HTMLInputElement>;

    /**
     * Error property, with type of the error and message.
     */
    error?: FieldError;
}
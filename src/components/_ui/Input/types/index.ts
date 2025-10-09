import type React from "react";
import type { FocusEvent, HTMLInputAutoCompleteAttribute } from "react";
import type { FieldError } from "react-hook-form";

/**
 * Props for the Input component.
 */
export interface InputProps {
    /**
     * Additional CSS classes for the input container.
     */
    containerClassName?: string;

    /**
     * Additional CSS classes for the input element.
     */
    className?: string;

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
     * Callback function triggered when the input value changes.
     * @param e The change event object.
     * @returns void
     */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

    /**
     * Placeholder text displayed in the input when it is empty.
     */
    placeholder?: string;

    /**
     * The type of input, e.g., "text", "number", "email", or "password".
     */
    type: "text" | "number" | "email" | "password" | "time" | "date";

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
     * If true, the input will be required.
     */
    required?: boolean;

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

    /**
     * Min value for number inputs.
     */
    min?: number;

    /**
     * Max value for number inputs.
     */
    max?: number;

    /**
     * ID for the input element.
     */
    id?: string;

    /**
     * Indicates whether the input is in a loading state.
     */
    loading?: boolean;
}

import React from "react";

export interface DropdownOption {
  icon?: React.ReactNode;
  nodeId?: number;
  separator?: boolean;
  label: string;
  subLabel?: string;
  value: number | string;
}

/**
 * Props for the CustomDropdown component.
 */
export interface DropdownProps {
  /**
   * Optional CSS class name to apply custom styles to the component.
   */
  className?: string;

  /**
   * If true, the component will expand to fill the available space.
   */
  grow?: boolean;

  /**
   * Array of options to display in the dropdown.
   */
  options: DropdownOption[];

  /**
   * Optional label to display above the dropdown.
   */
  label?: string;

  /**
   * The currently selected value. Can be a number, string or null if no value is selected.
   */
  value: number | string | null;

  selectedValues?: number[];

  /**
   * If true, the dropdown will be disabled and not interactable.
   */
  disabled?: boolean;

  /**
   * The type of dropdown to render. Can be either "normalDropdown", "searchDropdown" or "selectDropdown".
   */
  type: "normalDropdown" | "searchDropdown" | "selectDropdown";

  /**
   * Callback function triggered when the selected value changes.
   * @param value - The new selected value, or null if no value is selected.
   */
  onChange: (value: number | string | null) => void;

  /**
   * Callback function triggered when the dropdown loses focus.
   * @param e - The focus event.
   */
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * Inline styles to apply to the component.
   */
  style?: React.StyleHTMLAttributes<HTMLInputElement>;

  /**
   * If true, the component will display an error state.
   */
  errored?: boolean;

  /**
   * Optional error message to display when the component is in an error state.
   */
  errorMessage?: string;
}

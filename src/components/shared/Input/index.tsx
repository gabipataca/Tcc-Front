"use client";

import styles from "./Input.module.scss";
import React, { FocusEvent } from "react";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
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
    ref,
    ...otherProps
}) => {
    return (
        <div className={styles.inputContainer}>
            {label && <label htmlFor={name}>{label}</label>}
            <div>
                {icon}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) =>
                        setValue ? setValue(e.target.value) : undefined
                    }
                    onBlur={onBlur}
                    readOnly={readOnly}
                    disabled={disabled}
                    ref={ref}
                    {...otherProps}
                />
            </div>
        </div>
    );
};

export default Input;

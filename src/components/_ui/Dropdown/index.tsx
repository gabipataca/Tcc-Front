"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { DropdownProps } from "./types";
import styles from "./Dropdown.module.scss";
import { MdArrowDropDown, MdCheck } from "react-icons/md";

const CustomDropdown: React.FC<DropdownProps> = ({
    className,
    grow,
    disabled,
    options,
    selectedValues,
    label,
    value,
    type,
    onChange,
    onBlur,
    style,
    errored,
    errorMessage,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [searchString, setSearchString] = useState("");

    const selectedValuesString = useMemo(() => {
        return options
            // @ts-expect-error - Type mismatch between string | number
            .filter((opt) => selectedValues?.includes(opt.value))
            .map((opt) => opt.label)
            .sort()
            .join(", ");
    }, [options, selectedValues]);

    const onSpanInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleInputClick = () => {
        if (type === "searchDropdown") {
            onChange(null);
        }
        setIsOpen(!isOpen);
    };

    const filteredOptions = useMemo(() => {
        return options
            .filter((opt) => {
                if (
                    opt.label.toLowerCase().includes(searchString.toLowerCase())
                ) {
                    return true;
                }

                if (
                    opt.subLabel
                        ?.toLowerCase()
                        .includes(searchString.toLowerCase())
                ) {
                    return true;
                }

                if (opt.separator) {
                    return true;
                }

                if (
                    opt.nodeId
                        ?.toString()
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                ) {
                    return true;
                }

                return false;
            })
            .filter((opt, index) => {
                if (opt.separator == true && index == 0) {
                    return false;
                }

                return true;
            });
    }, [options, searchString]);

    // Fecha o dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                dropdownRef.current.blur();
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const optionsToUse = useMemo(() => {
        if (searchString === "") {
            return options;
        }

        return filteredOptions;
    }, [filteredOptions, options, searchString]);

    // Calcula a altura máxima que pode ser exibida pelo dropdown sem causar overflow
    useEffect(() => {
        if (optionsRef && isOpen) {
            const screenSize = document.body.offsetHeight;
            const optClientRect = optionsRef.current!.getBoundingClientRect();
            const maxHeight = screenSize - optClientRect.y;
            let heightNeeded = 0;
            let totalHeightNeeded = 0;
            optionsToUse.forEach((opt) => {
                if (opt.separator) {
                    heightNeeded += heightNeeded + 17 < maxHeight ? 17 : 0;
                    totalHeightNeeded += 17;
                } else if (!opt.subLabel) {
                    heightNeeded += heightNeeded + 48 < maxHeight ? 48 : 0;
                    totalHeightNeeded += 48;
                } else {
                    heightNeeded += heightNeeded + 68 < maxHeight ? 68 : 0;
                    totalHeightNeeded += 68;
                }
            });
            optionsRef.current!.style.height = `${heightNeeded}px`;
            if (totalHeightNeeded > heightNeeded) {
                optionsRef.current!.style.overflowY = "scroll";
            } else {
                optionsRef.current!.style.overflowY = "hidden";
            }
        }
    }, [isOpen, optionsToUse]);

    useEffect(() => {
        if (isOpen && type === "searchDropdown") {
            searchInputRef.current?.focus();
        }
    }, [isOpen, type]);

    const selectedOption = useMemo(() => {
        return options.find((opt) => opt.value === value) || null;
    }, [value, options]);

    return (
        <div
            className={`${styles.dropdownWrapper} ${grow && styles.grow} ${
                disabled && styles.disabled
            } ${className ?? ""}`}
            onBlur={onBlur}
            key={React.useId()}
        >
            {label && (
                <div
                    className={`${styles.dropdownLabel} ${
                        errored && styles.errored
                    }`}
                >
                    {label}
                </div>
            )}
            <div className={`${styles.customSelect}`} ref={dropdownRef}>
                <button
                    className={`${errored && styles.errored}`}
                    onClick={!disabled ? () => handleInputClick() : () => {}}
                    key={React.useId()}
                >
                    <div className={`${styles.labelContainer}`} style={style}>
                        <div className={`${styles.label}`}>
                            {type === "normalDropdown" && (
                                <>{selectedOption?.label || "Selecione"}</>
                            )}

                            {type === "searchDropdown" && (
                                <>
                                    {selectedOption != null && (
                                        <>
                                            {selectedOption.icon ?? ""}
                                            {selectedOption.label}
                                        </>
                                    )}

                                    {selectedOption == null && (
                                        <input
                                            onChange={onSpanInputChange}
                                            placeholder={"Pesquise"}
                                            value={searchString}
                                            ref={searchInputRef}
                                        />
                                    )}
                                </>
                            )}

                            {type === "selectDropdown" && (
                                <>
                                    {selectedValuesString !== ""
                                        ? selectedValuesString
                                        : "Selecione"}
                                </>
                            )}
                        </div>
                    </div>
                    <span
                        className={`${styles.arrowDown} ${
                            isOpen && styles.open
                        }`}
                        key={React.useId()}
                    >
                        <MdArrowDropDown />
                    </span>
                </button>

                {/* Opções do Dropdown */}
                {isOpen && (
                    <ul ref={optionsRef}>
                        {optionsToUse.map((option, idx) => {
                            if (option.separator === true) {
                                return (
                                    <li
                                        className={styles.dividerContainer}
                                        key={`divider-${idx}`}
                                    >
                                        <div className={styles.divider}></div>
                                    </li>
                                );
                            }

                            return (
                                <li
                                    key={`${option.label}-${idx}`}
                                    onClick={() => {
                                        onChange(option.value);
                                        if (type !== "selectDropdown") {
                                            setIsOpen(false);
                                        }
                                    }}
                                    className={styles.option}
                                >
                                    {(option.icon && (
                                        <div className={`${styles.icon}`}>
                                            {option.icon}
                                        </div>
                                    )) ||
                                        ""}
                                    <div className={`${styles.labelContainer}`}>
                                        <div className={`${styles.label}`}>
                                            {option.label}
                                        </div>
                                        <div className={`${styles.subLabel}`}>
                                            {option.subLabel}
                                        </div>
                                    </div>
                                    {type === "selectDropdown" && (
                                        <div
                                            className={`${styles.check} ${
                                                // @ts-expect-error - Type mismatch between string | number
                                                selectedValues?.includes(option.value) && styles.checked
                                            }`}
                                        >
                                            {/* @ts-expect-error - Type mismatch between string | number */}
                                            {selectedValues?.includes(option.value) && <MdCheck />}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {errored && (
                <span className={`${styles.errorMessage}`}>{errorMessage}</span>
            )}
        </div>
    );
};

export default CustomDropdown;

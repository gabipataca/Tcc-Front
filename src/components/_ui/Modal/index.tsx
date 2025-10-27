"use client";

import React from "react";
import FadeTransition from "../FadeTransition";
import CircularProgress from "@mui/material/CircularProgress";

import MuiModal from "@mui/material/Modal";
import { ModalHeader } from "./components/ModalHeader";
import { ModalProps } from "./types";
import { Backdrop, ModalContainer } from "./styles";
import { ModalBodyScroll } from "./components/ModalBody";
import { ModalFooter } from "./components/ModalFooter";
import Button from "../Button";

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    bodyContent,
    size = "md",
    width,
    loading = false,
    showCloseButton = true,
    status,
    center = true,
    hasConfirmButton,
    hasCancelButton,
    confirmButtonContent,
    cancelButtonContent,
    onConfirm,
    onCancel,
    title,
    description,
    headerIcon,
    growFooterButtons,
}) => (
    <MuiModal open={open} onClose={onClose} closeAfterTransition>
        <FadeTransition in={open} duration={200}>
            <Backdrop center={center}>
                <ModalContainer size={size} width={width}>
                    {(status || title || description) && (
                        <ModalHeader
                            status={status}
                            showCloseButton={showCloseButton}
                            onClose={onClose}
                            title={title}
                            description={description}
                            headerIcon={headerIcon}
                        />
                    )}
                    <ModalBodyScroll>
                        {loading ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: 120,
                                }}
                            >
                                <CircularProgress />
                            </div>
                        ) : (
                            bodyContent
                        )}
                    </ModalBodyScroll>
                    <ModalFooter>
                        {hasCancelButton && (
                            <Button
                                className={`${
                                    growFooterButtons ? "flex-1" : ""
                                }`}
                                variant="destructive"
                                rounded
                                onClick={onCancel}
                                disabled={loading}
                                type="button"
                            >
                                {cancelButtonContent || "Cancelar"}
                            </Button>
                        )}
                        {hasConfirmButton && (
                            <Button
                                className={`${
                                    growFooterButtons ? "flex-1" : ""
                                }`}
                                variant="success"
                                rounded
                                onClick={onConfirm}
                                disabled={loading}
                                type="button"
                            >
                                {confirmButtonContent || "Confirmar"}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContainer>
            </Backdrop>
        </FadeTransition>
    </MuiModal>
);

export default Modal;

// Adicione ao seu CSS global ou module:
// .modal-fade-enter { opacity: 0; transform: scale(0.96); }
// .modal-fade-enter-active { opacity: 1; transform: scale(1); transition: opacity 200ms, transform 200ms; }
// .modal-fade-exit { opacity: 1; transform: scale(1); }
// .modal-fade-exit-active { opacity: 0; transform: scale(0.96); transition: opacity 200ms, transform 200ms; }

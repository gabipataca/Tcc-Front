import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { ModalStatus } from "../../types";
import { ModalHeaderProps } from "./types";
import {
    ModalHeaderDescription,
    ModalHeaderRoot,
    ModalHeaderTitle,
    ModalHeaderTitleContainer,
    ModalIcon,
} from "./styles";
import TitleLarge from "@/components/_ui/TitleLarge";

const getStatusIcon = (status: ModalStatus) => {
    switch (status) {
        case "success":
            return <CheckCircleIcon color="success" />;
        case "error":
            return <ErrorIcon color="error" />;
        case "warning":
            return <WarningIcon color="warning" />;
        case "info":
            return <InfoIcon color="info" />;
        default:
            return null;
    }
};

export const ModalHeader: React.FC<
    React.PropsWithChildren<ModalHeaderProps>
> = ({
    status,
    showCloseButton = true,
    onClose,
    children,
    title,
    description,
    headerIcon,
}) => (
    <ModalHeaderRoot>
        <ModalHeaderTitleContainer>
            {status && !headerIcon && (
                <ModalIcon>{getStatusIcon(status)}</ModalIcon>
            )}
            {headerIcon && <ModalIcon>{headerIcon}</ModalIcon>}
            {title && <ModalHeaderTitle>{title}</ModalHeaderTitle>}

            {showCloseButton && onClose && (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    className="ml-auto"
                    size="small"
                    sx={{ ml: 1 }}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </ModalHeaderTitleContainer>
        {description && (
            <ModalHeaderDescription>{description}</ModalHeaderDescription>
        )}
        {children}
        <span style={{ flex: 1 }} />
    </ModalHeaderRoot>
);

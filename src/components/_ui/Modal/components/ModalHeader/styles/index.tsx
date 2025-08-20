import { styled } from "@mui/material";

export const ModalHeaderRoot = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontWeight: 600,
    fontSize: 18,
    minHeight: 56,
    gap: theme.spacing(1),
}));

export const ModalHeaderTitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
}));

export const ModalHeaderTitle = styled("h2")(({ theme }) => ({
  fontSize: "1.5rem",
  lineHeight: "2rem",
  color: "#3f3c40",
  margin: 0,
  display: "inline-flex",
  flexDirection: "row",
  gap: "0.25rem"
}));

export const ModalHeaderDescription = styled("p")(({ theme }) => ({
  fontSize: "1.25rem",
  lineHeight: "1.75rem",
  color: "#4F85A6",
  display: "flex",
  flexDirection: "row",
  gap: "0.25rem"
}));

export const ModalIcon = styled("span")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    fontSize: 28,
    marginRight: theme.spacing(1),
}));

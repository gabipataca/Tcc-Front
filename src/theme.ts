'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';


const roboto = Roboto({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;

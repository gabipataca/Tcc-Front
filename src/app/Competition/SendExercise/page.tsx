'use client';

import { FaUpload, FaPaperPlane } from "react-icons/fa";
import Button from '@/components/_ui/Button';
import { Box, Paper, Typography } from '@mui/material';
import Navbar from '@/components/_ui/Navbar'; 
export default function AnaliseJuiz() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar/>
      

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          py: 4,
          px: 2,
          width: '100%',
          flexGrow: 1,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 4,
            width: '100%',
            maxWidth: '800px',
            textAlign: 'center',
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 'bold',
              color: '#4F85A6',
              mb: 6,
              letterSpacing: '0.05em',
            }}
          >
            Submeter a análise do Juíz
          </Typography>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg mb-2">
              <Typography variant="body1" component="span" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                Escolha o exercício:
              </Typography>
            </label>
            <div className="flex justify-center gap-4 mt-2 items-center">
              <select
                className="border rounded-lg px-4 py-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
                style={{
                  minHeight: '48px',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                }}
              >
                {[...'ABCDEFGHIJ'].map((letter) => (
                  <option key={letter}>{letter}</option>
                ))}
              </select>
              <Button
                className="bg-[#4F85A6] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-md flex items-center justify-center gap-2"
              >
                <FaUpload size={18} /> Anexar arquivo
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg mb-2">
              <Typography variant="body1" component="span" sx={{ color: '#4F85A6', fontWeight: 'bold' }}>
                Escolha a Linguagem:
              </Typography>
            </label>
            <select
              className="border rounded-lg px-4 py-2 mt-2 w-40 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4F85A6] focus:border-transparent transition-all duration-200"
              style={{
                minHeight: '48px',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem',
              }}
            >
              {["C", "C++", "C#", "Java", "PHP", "Python"].map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <Button
            className="bg-[#4F85A6] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3B6A82] transition-all duration-300 shadow-lg flex items-center justify-center mx-auto gap-2"
          >
            <FaPaperPlane size={18} /> Enviar
          </Button>
        </Paper>
      </Box>
    </div>
  );
}
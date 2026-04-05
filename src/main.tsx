import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import './index.css';
import App from './App.tsx';
import theme from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <App />
    </CssVarsProvider>
  </StrictMode>,
);

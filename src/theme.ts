import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#E8F0FB',
          100: '#C5D6F5',
          200: '#9DBAEE',
          300: '#749EE7',
          400: '#4B82E0',
          500: '#2266D9',
          600: '#1B52AD',
          700: '#143E82',
          800: '#0D2A57',
          900: '#06162B',
          solidBg: '#143E82',
          solidHoverBg: '#0D2A57',
          solidActiveBg: '#06162B',
          solidColor: '#fff',
          outlinedColor: '#143E82',
          outlinedHoverBg: '#E8F0FB',
          softBg: '#C5D6F5',
          softColor: '#0D2A57',
          plainColor: '#143E82',
          plainHoverBg: '#E8F0FB',
        },
        success: {
          50: '#E8F5E9',
          500: '#2E7D32',
          solidBg: '#2E7D32',
          solidHoverBg: '#1B5E20',
          solidColor: '#fff',
          outlinedColor: '#2E7D32',
          softBg: '#E8F5E9',
          softColor: '#1B5E20',
        },
        warning: {
          50: '#FFF3E0',
          500: '#E65100',
          solidBg: '#E65100',
          solidHoverBg: '#BF360C',
          solidColor: '#fff',
          outlinedColor: '#E65100',
          softBg: '#FFF3E0',
          softColor: '#BF360C',
        },
        danger: {
          50: '#FFEBEE',
          500: '#C62828',
          solidBg: '#C62828',
          solidHoverBg: '#8E0000',
          solidColor: '#fff',
          outlinedColor: '#C62828',
          softBg: '#FFEBEE',
          softColor: '#8E0000',
        },
      },
    },
  },
  fontFamily: {
    body: '"Inter", system-ui, sans-serif',
    display: '"Inter", system-ui, sans-serif',
  },
  typography: {
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    JoyCard: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
        },
      },
    },
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;

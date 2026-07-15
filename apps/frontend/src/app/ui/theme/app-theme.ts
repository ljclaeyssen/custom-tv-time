import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

// Dark minimaliste : fond quasi-noir, une seule couleur d'accent (jaune signal,
// héritage TV Time), hairlines discrètes. Tout le reste est neutre.
export const appTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fffbe6',
      100: '#fff3b8',
      200: '#ffe98a',
      300: '#ffdf5c',
      400: '#ffd84d',
      500: '#ffd60a',
      600: '#e6bf00',
      700: '#b39500',
      800: '#806a00',
      900: '#4d4000',
      950: '#1a1500',
    },
    colorScheme: {
      dark: {
        primary: {
          color: '#ffd60a',
          contrastColor: '#0a0b0e',
          hoverColor: '#ffdf5c',
          activeColor: '#e6bf00',
        },
        surface: {
          0: '#ffffff',
          50: '#f5f6f7',
          100: '#9ba1a8',
          200: '#6e747c',
          300: '#4a4f56',
          400: '#33373d',
          500: '#26292f',
          600: '#1d2025',
          700: '#16181d',
          800: '#131519',
          900: '#0e1013',
          950: '#0a0b0e',
        },
      },
    },
  },
});

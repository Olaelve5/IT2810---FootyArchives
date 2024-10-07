import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { createTheme, MantineProvider, virtualColor } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryShade: {light: 9, dark: 9},
  colors: {
    'darkmode': ['#1D2430', '#273040', '#303C4F', '#3A475F', '#43536F', '#4D5F7E', '#566B8E', '#60769E', '#6982AD', '#738EBD'],
    primary: virtualColor({
      name: 'primary',
      dark: 'green',
      light: 'green',
    }),
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme='auto'>
      <App />
    </MantineProvider>
  </StrictMode>,
);

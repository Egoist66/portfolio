import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import GlobalStyles from './style/Global';

import { ThemeProvider } from 'styled-components';
import { themeStyle } from './theme/theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <ThemeProvider theme={themeStyle}>

    <GlobalStyles />
    <App />

  </ThemeProvider>
  
);


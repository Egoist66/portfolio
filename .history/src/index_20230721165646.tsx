import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';

import { ThemeProvider } from 'styled-components';
import { themeStyle } from './theme/theme';
import GlobalStyles from './style/Global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  

  <ThemeProvider theme={themeStyle}>


    <GlobalStyles />
    <App />

  </ThemeProvider>
  
 
  
);

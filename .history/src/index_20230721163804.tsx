import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import GlobalStyles from './style/Global';

import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <>
    <GlobalStyles />
    <App />
  </>
  
);


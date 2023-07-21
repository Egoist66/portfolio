import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import GlobalStyles from './style/Global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <>
    <GlobalStyles />
    <App />
  </>
  
);


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import { ThemeProvider } from "styled-components";
import { themeStyle } from "./theme/theme";
import GlobalStyles from "./style/Global";
import AppContext from "./context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <ThemeProvider theme={themeStyle}>
      <AppContext>

        <GlobalStyles />
        <App />
        
      </AppContext>
    </ThemeProvider>
  </Router>
);

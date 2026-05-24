import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import AppContext from "./context/AppContext";
import ThemeContextProvider from "./context/ThemeContext";
import LanguageContextProvider from "./context/LanguageContext";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <ThemeContextProvider>
      <LanguageContextProvider>
        <AppContext>
          <App />
        </AppContext>
      </LanguageContextProvider>
    </ThemeContextProvider>
  </Router>
);

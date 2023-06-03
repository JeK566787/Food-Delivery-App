import React from "react";
import ReactDOM from "react-dom/client";
import "./frontend/styles/index.css";
import App from "./frontend/App";

import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

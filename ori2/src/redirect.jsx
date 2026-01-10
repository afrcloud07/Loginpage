import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import RedirectPage from "./pages/Redirect.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RedirectPage />
  </React.StrictMode>
)

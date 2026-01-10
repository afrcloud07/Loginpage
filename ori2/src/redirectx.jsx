import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import RedirectXPage from "./pages/RedirectX.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RedirectXPage />
  </React.StrictMode>
)

import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import StatusPage from "./pages/Status.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StatusPage />
  </React.StrictMode>
)

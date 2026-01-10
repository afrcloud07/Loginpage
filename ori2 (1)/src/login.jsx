import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import LoginPage from "./pages/Login.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginPage />
  </React.StrictMode>
)

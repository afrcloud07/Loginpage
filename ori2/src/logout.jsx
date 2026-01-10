import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import LogoutPage from "./pages/Logout.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LogoutPage />
  </React.StrictMode>
)

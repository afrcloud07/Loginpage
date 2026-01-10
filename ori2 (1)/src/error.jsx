import React from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import ErrorPage from "./pages/Error.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorPage />
  </React.StrictMode>
)

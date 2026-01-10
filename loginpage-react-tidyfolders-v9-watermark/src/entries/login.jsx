import React from "react";
import Watermark from "../components/Watermark";
import ReactDOM from "react-dom/client";
import { getTarget } from "../lib/mikrotik";
import OnlineLogin from "../pages/OnlineLogin";
import OfflineMaintenance from "../pages/OfflineMaintenance";

const target = getTarget();
const App = target === "offline" ? OfflineMaintenance : OnlineLogin;

ReactDOM.createRoot(document.getElementById("root")).render(<><App /><Watermark /></>);

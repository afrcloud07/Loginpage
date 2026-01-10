import React from "react";
import Watermark from "../components/Watermark";
import ReactDOM from "react-dom/client";
import { getTarget } from "../lib/mikrotik";
import OnlineStatus from "../pages/OnlineStatus";
import OfflineMaintenance from "../pages/OfflineMaintenance";

const target = getTarget();
const App = target === "offline" ? OfflineMaintenance : OnlineStatus;

ReactDOM.createRoot(document.getElementById("root")).render(<><App /><Watermark /></>);

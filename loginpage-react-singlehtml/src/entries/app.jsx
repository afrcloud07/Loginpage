import React from "react";
import ReactDOM from "react-dom/client";
import { getTarget } from "../lib/mikrotik";

import OnlineLogin from "../pages/OnlineLogin";
import OnlineStatus from "../pages/OnlineStatus";
import OnlineRedirect from "../pages/OnlineRedirect";
import OnlineError from "../pages/OnlineError";
import OnlineLogout from "../pages/OnlineLogout";
import OfflineMaintenance from "../pages/OfflineMaintenance";

import Watermark from "../components/Watermark";

function getPageFromPath() {
  try {
    const p = (window.location.pathname || "").toLowerCase();
    if (p.endsWith("/status.html") || p.endsWith("\\status.html") || p.endsWith("status.html")) return "status";
    if (p.endsWith("/redirect.html") || p.endsWith("redirect.html")) return "redirect";
    if (p.endsWith("/alogin.html") || p.endsWith("alogin.html")) return "redirect";
    if (p.endsWith("/error.html") || p.endsWith("error.html")) return "error";
    if (p.endsWith("/logout.html") || p.endsWith("logout.html")) return "logout";
    return "login";
  } catch {
    return "login";
  }
}

function AppRouter() {
  const target = getTarget();
  const page = getPageFromPath();

  // OFFLINE: selalu tampilkan halaman maintenance
  if (target === "offline") return <OfflineMaintenance />;

  // ONLINE routing
  if (page === "status") return <OnlineStatus />;
  if (page === "redirect") return <OnlineRedirect />;
  if (page === "error") return <OnlineError />;
  if (page === "logout") return <OnlineLogout />;
  return <OnlineLogin />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppRouter />
    <Watermark />
  </>
);

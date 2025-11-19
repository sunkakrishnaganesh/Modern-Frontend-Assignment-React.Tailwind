import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";

// MSW setup for development only (if present)
async function boot() {
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import("./mocks/browser");
      await worker.start({
        serviceWorker: { url: "/mockServiceWorker.js" },
        onUnhandledRequest: "warn",
      });
      console.info("[MSW] Mock API worker started");
    } catch (e) {
      // ignore if mocks not present
      console.warn("MSW not available", e);
    }
  }

  const root = document.getElementById("root");
  if (!root) {
    console.error("Root element not found");
    return;
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

boot();

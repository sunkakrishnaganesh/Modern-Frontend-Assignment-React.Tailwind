import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./reset.css";

async function startMSW() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      serviceWorker: {
        url: "/mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass",
    });
    console.log("✔ MSW running");
  }
}

startMSW().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

import { StrictMode } from "react"; // Composant de dev qui monte/démonte/remonte pour éviter les bugs
import { createRoot } from "react-dom/client"; // Traducteur vers le DOM
import "./index.css";
import App from "./App.jsx";

/* --- Cible le div root dans le html --- */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

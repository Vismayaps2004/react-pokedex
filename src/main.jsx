import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./colors.css";
import "./card.css";
import "./sidebar.css";
import App from "./App.jsx";
import pokemon from "../data/pokemon.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App pokemon={pokemon} />
  </StrictMode>,
);

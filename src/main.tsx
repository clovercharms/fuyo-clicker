import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { FuyoClicker } from "./FuyoClicker.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <FuyoClicker />
    </StrictMode>
);

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Spoiler } from "@/components/spoiler/index.tsx";

import { FuyoClicker } from "./FuyoClicker.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Spoiler>
            <FuyoClicker />
        </Spoiler>
    </StrictMode>
);

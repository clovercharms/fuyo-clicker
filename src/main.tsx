import React from "react";
import ReactDOM from "react-dom/client";
import FuyoClicker from "./FuyoClicker.tsx";
import "./index.css";
import Spoiler from './components/spoiler/index.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Spoiler>
            <FuyoClicker />
        </Spoiler>
    </React.StrictMode>
);

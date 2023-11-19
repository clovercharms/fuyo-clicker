import { Dialog } from "@/components/dialog";
import { useGameStore } from "@/stores/game";
import { useState } from "react";
import normal from "@/assets/images/ending/normal.png";
import full from "@/assets/images/ending/full.png";

import classes from "./index.module.css";

export function Ending() {
    const ending = useGameStore(state => state.popups.ending);
    const [open, setOpen] = useState<boolean | null>(null);

    if (!ending.reached) return;

    return (
        <Dialog
            className={classes.ending}
            open={ending.reached ?? open}
            onCancel={() => setOpen(false)}
        >
            <h1>Happy Anniversary Fuyo!</h1>
            <a href={full} target="_blank" rel="noreferrer">
                <img src={normal} />
            </a>
        </Dialog>
    );
}

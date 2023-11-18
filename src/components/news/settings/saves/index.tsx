import { Button } from "@/components/button";
import { MutableRefObject } from "react";

import classes from "../index.module.css";

import { useSaves } from "./useSaves";
import { useReset } from "./useReset";

export interface SavesProps {
    dialogRef: MutableRefObject<HTMLDialogElement | null>;
}

export function Saves({ dialogRef }: SavesProps) {
    const { exportSave, loadSave } = useSaves();
    const { reset } = useReset();

    return (
        <section>
            <h2>Saves</h2>
            <div className={classes.row}>
                <Button onClick={exportSave}>📤 Export Save</Button>
                <Button onClick={loadSave}>📩 Load Save</Button>
            </div>
            <Button
                onClick={() => {
                    reset();
                    dialogRef.current?.close();
                }}
            >
                🛑 Reset Progress
            </Button>
        </section>
    );
}

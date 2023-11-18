import { Dialog } from "@/components/dialog";
import { useRef } from "react";
import { Button } from "@/components/button";

import { Saves } from "./saves";
import { Debug } from "./debug";
import { Audio } from "./audio";
import { Quality } from "./quality";
import classes from "./index.module.css";

export function Settings() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    return (
        <>
            <Button onClick={() => dialogRef.current?.showModal()}>⚙️</Button>
            <Dialog ref={dialogRef} className={classes.settings}>
                <h1>Settings</h1>
                <Quality />
                <Audio />
                <Saves />
                <Debug />
            </Dialog>
        </>
    );
}

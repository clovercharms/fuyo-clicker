import classes from "./index.module.css";
import { HTMLProps } from "react";

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function ReproductionRoom(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Reproduction Room</h1>
        </div>
    );
}

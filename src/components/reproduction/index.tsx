import classes from "./index.module.css";
import { HTMLProps } from "react";

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function Reproduction(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Reproduction</h1>
        </div>
    );
}

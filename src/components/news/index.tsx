import classes from "./index.module.css";
import { HTMLProps } from "react";

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>News</h1>
        </div>
    );
}

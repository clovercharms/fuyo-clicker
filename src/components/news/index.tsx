import { useGameStore } from "../../store";
import classes from "./index.module.css";
import { HTMLProps } from "react";

/**
 * Newsreel that displays news based on current or random events.
 */
export default function News(props: HTMLProps<HTMLDivElement>) {
    const reset = useGameStore(state => state.reset);
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>News</h1>
            <button
                onClick={() => {
                    reset();
                    window.location.reload();
                }}
            >
                Reset all progress
            </button>
        </div>
    );
}

import classes from "./index.module.css";
import { HTMLProps } from "react";
import Lane from "./lane";
import { useGameStore } from "../../store";

/**
 * Collection of Lanes for Clovers to be assigned to.
 */
export default function Lanes(props: HTMLProps<HTMLDivElement>) {
    const lanes = useGameStore(state => state.lanes.rows);
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Buildings</h1>
            {Object.entries(lanes)
                .filter(([, lane]) => lane.buildings > 0)
                .map(([type, lane]) => (
                    <Lane key={type} type={parseInt(type)} lane={lane} />
                ))}
        </div>
    );
}

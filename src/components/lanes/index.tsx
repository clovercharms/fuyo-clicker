import classes from "./index.module.css";
import { HTMLProps } from "react";
import Lane from "./lane";
import { useGameStore } from "../../store";
import cx from "classix";

/**
 * Collection of Lanes for Clovers to be assigned to.
 */
export default function Lanes(props: HTMLProps<HTMLDivElement>) {
    const lanes = useGameStore(state => state.lanes.types);

    return (
        <div {...props} className={cx(classes.lanes, props.className)}>
            <div className={classes.border} />
            {Object.entries(lanes)
                .filter(([, lane]) => lane.buildings > 0)
                .map(([type, lane]) => (
                    <>
                        <Lane key={type} type={parseInt(type)} lane={lane} />
                        <div className={classes.border} />
                    </>
                ))}
        </div>
    );
}

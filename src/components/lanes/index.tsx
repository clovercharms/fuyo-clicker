import classes from "./index.module.css";
import { Fragment, HTMLProps } from "react";
import Lane from "./lane";
import { useGameStore } from "@/store";
import cx from "classix";
import { useRect } from "@/hooks/useRect";

/**
 * Collection of Lanes for Clovers to be assigned to.
 */
export default function Lanes(props: HTMLProps<HTMLDivElement>) {
    const lanes = useGameStore(state => state.lanes.types);
    const { elementRef, rect } = useRect<HTMLDivElement>();

    return (
        <div
            {...props}
            ref={elementRef}
            className={cx(classes.lanes, props.className)}
        >
            <div className={classes.border} />
            {rect !== null &&
                Object.entries(lanes)
                    .filter(([, lane]) => lane.buildings > 0)
                    .map(([type, lane]) => (
                        <Fragment key={type}>
                            <Lane
                                type={parseInt(type)}
                                lane={lane}
                                rect={rect}
                            />
                            <div className={classes.border} />
                        </Fragment>
                    ))}
        </div>
    );
}

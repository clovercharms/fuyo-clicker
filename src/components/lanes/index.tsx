import { Fragment, HTMLProps } from "react";
import { useGameStore } from "@/stores/game";
import cx from "classix";
import { useElementSize } from "usehooks-ts";

import { Divider, Orientation } from "../divider";

import { Lane } from "./lane";
import classes from "./index.module.css";

/**
 * Collection of Lanes for Clovers to be assigned to.
 */
export function Lanes(props: HTMLProps<HTMLDivElement>) {
    const lanes = useGameStore(state => state.lanes.types);
    const [elementRef, size] = useElementSize();

    return (
        <div
            {...props}
            ref={elementRef}
            className={cx(classes.lanes, props.className)}
        >
            {size.width + size.height !== 0 &&
                Object.entries(lanes)
                    .filter(([, lane]) => lane.buildings > 0)
                    .map(([type, lane]) => (
                        <Fragment key={type}>
                            <Lane
                                type={parseInt(type)}
                                lane={lane}
                                size={size}
                            />
                            <Divider orientation={Orientation.HORIZONTAL} />
                        </Fragment>
                    ))}
        </div>
    );
}

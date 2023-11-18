/* eslint-disable react-refresh/only-export-components */
import cx from "classix";

import classes from "./index.module.css";

export enum Orientation {
    VERTICAL,
    HORIZONTAL,
}

export interface DividerProps {
    orientation?: Orientation;
}

const ORIENTATION_CLASSES = {
    [Orientation.VERTICAL]: classes.vertical,
    [Orientation.HORIZONTAL]: classes.horizontal,
};

export function Divider({ orientation = Orientation.VERTICAL }: DividerProps) {
    return (
        <div
            className={cx(classes.divider, ORIENTATION_CLASSES[orientation])}
        />
    );
}

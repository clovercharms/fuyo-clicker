import classes from "./index.module.css";
import { HTMLProps } from "react";

/**
 * Shop for buying upgrades and advancements.
 */
export default function Shop(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Shop</h1>
        </div>
    );
}

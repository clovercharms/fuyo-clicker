import classes from "./index.module.css";
import { HTMLProps } from "react";
import Lane from "./lane";
import { LaneType } from './lane/meta';

/**
 * Collection of Lanes for Clovers to be assigned to.
 */
export default function Lanes(props: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <h1>Buildings</h1>
            <Lane type={LaneType.Mine} />
            <Lane type={LaneType.Forge} />
            <Lane type={LaneType.ConstructionSite} />
            <Lane type={LaneType.RepairShop} />
            <Lane type={LaneType.Lab} />
        </div>
    );
}

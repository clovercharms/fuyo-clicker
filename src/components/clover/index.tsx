import classes from "./index.module.css";
import base from "../../assets/images/clover/base.png";
import { HTMLProps } from "react";
import { Jobs } from "./data";
import { Clover as IClover } from '../clover/slice';

export interface CloverProps extends HTMLProps<HTMLDivElement> {
    clover: IClover;
}

/**
 * Represents a single clover as part of a lane.
 * Clovers are assigned a job and may contain cosmetic layers.
 */
export default function Clover({ clover, ...props }: CloverProps) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <span className={classes.name}>{clover.name}</span>
            <div
                className={classes.body}
                // Offset "squeeze" animation randomly per render
                // style={{ animationDelay: `${Math.random()}s` }}
            >
                <img src={base} />
                {clover.job !== undefined && <img src={Jobs[clover.job]} />}
            </div>
        </div>
    );
}

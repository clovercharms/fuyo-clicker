import classes from "./index.module.css";
import base from "@/assets/images/clover/base.png";
import hero from "@/assets/images/clover/hero.png";
import { HTMLProps } from "react";
import { Job, Jobs, names } from "./data";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import { CloverType } from "../lanes/slice";
import cx from "classix";

export interface CloverProps
    extends Omit<HTMLProps<HTMLDivElement>, "id" | "type"> {
    id: number;
    job: Job;
    type?: CloverType;
}

/**
 * Represents a single clover as part of a lane.
 * Clovers are assigned a job and may contain cosmetic layers.
 */
export default function Clover({
    id,
    job,
    type = CloverType.Regular,
    ...props
}: CloverProps) {
    const rand = xoroshiro128plus(id);
    const name = names[dist(0, names.length - 1, rand)];

    return (
        <div {...props} className={cx(classes.clover, props.className)}>
            <span className={classes.name}>{name}</span>
            <div className={classes.body}>
                {!Jobs[job].substitute && (
                    <img src={type === CloverType.Regular ? base : hero} />
                )}
                <img src={Jobs[job].src} />
            </div>
        </div>
    );
}

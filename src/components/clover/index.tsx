import classes from "./index.module.css";
import base from "../../assets/images/clover/base.png";
import { HTMLProps } from "react";
import { Job, Jobs, names } from "./data";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from 'pure-rand';

export interface CloverProps extends Omit<HTMLProps<HTMLDivElement>, 'id'> {
    id: number;
    job: Job;
}

/**
 * Represents a single clover as part of a lane.
 * Clovers are assigned a job and may contain cosmetic layers.
 */
export default function Clover({ id, job, ...props }: CloverProps) {
    const rand = xoroshiro128plus(id);
    const name = names[dist(0, names.length-1, rand)];

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <span className={classes.name}>{name}</span>
            <div className={classes.body}>
                <img src={base} />
                <img src={Jobs[job]} />
            </div>
        </div>
    );
}

import classes from "./index.module.css";
import { HTMLProps } from "react";
import { CloverType, Job, Jobs, names } from "./data";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
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
    const rand = xoroshiro128plus(id * 1.5);
    const name = names[dist(0, names.length - 1, rand)];

    let extra: string | null = null;
    if (Jobs[job].extras !== undefined && dist(0, 1, rand) > 0.5) {
        extra = Jobs[job].extras![dist(0, Jobs[job].extras!.length - 1, rand)];
    }
    const bases = Jobs[job].bases?.[type];
    let base: string | null = null;
    if (bases !== undefined) {
        base = bases[dist(0, bases.length - 1, rand)];
    }

    return (
        <div {...props} className={cx(classes.clover, props.className)}>
            <span className={classes.name}>{name}</span>
            <div className={classes.body}>
                {base !== null && <img src={base} />}
                {extra !== null && <img src={extra} />}
                {Jobs[job].cosmetics?.map((cosmetic, i) => (
                    <img key={i} src={cosmetic} />
                ))}
            </div>
        </div>
    );
}

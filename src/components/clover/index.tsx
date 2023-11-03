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
    const rand = xoroshiro128plus(id);
    const name = names[dist(0, names.length - 1, rand)];

    let extra: string | null = null;
    if (Jobs[job].extras !== undefined && dist(0, 1, rand) > 0.5) {
        extra = Jobs[job].extras![dist(0, Jobs[job].extras!.length - 1, rand)];
    }

    return (
        <div {...props} className={cx(classes.clover, props.className)}>
            <span className={classes.name}>{name}</span>
            <div className={classes.body}>
                {Jobs[job].bases !== undefined && (
                    <img src={Jobs[job].bases![type]} />
                )}
                {extra && <img src={extra} />}
                {Jobs[job].cosmetics?.map((cosmetic, i) => (
                    <img key={i} src={cosmetic} />
                ))}
                {Jobs[job].overlay && <img src={Jobs[job].overlay} />}
            </div>
        </div>
    );
}

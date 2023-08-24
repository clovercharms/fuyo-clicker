import classes from "./index.module.css";
import base from "../../assets/images/clover/base.png";
import { HTMLProps } from "react";
import { Job, Jobs, names } from "./meta";

export interface IClover extends HTMLProps<HTMLDivElement> {
    /** The job of the clover. */
    job: Job;
}

/**
 * Represents a single clover as part of a lane.
 * Clovers are assigned a job and may contain cosmetic layers.
 */
export default function Clover({ job, ...props }: IClover) {
    // Select random name
    const name = names[Math.round(Math.random() * (names.length - 1))];

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <span className={classes.name}>{name}</span>
            <div
                className={classes.body}
                // Offset "squeeze" animation randomly per render
                style={{ animationDelay: `${Math.random()}s` }}
            >
                <img src={base} />
                <img
                    src={
                        new URL(
                            `../../assets/images/clover/jobs/${Jobs[job]}.png`,
                            import.meta.url
                        ).href
                    }
                />
            </div>
        </div>
    );
}

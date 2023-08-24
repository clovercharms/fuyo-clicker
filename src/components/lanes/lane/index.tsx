import classes from "./index.module.css";
import { HTMLProps } from "react";
import Clover from "../../clover";
import { LaneType, LaneTypes } from './meta';

export interface ILane extends Omit<HTMLProps<HTMLDivElement>, "type"> {
    /** The type of lane. */
    type: LaneType;
}

/**
 * A lane is a workable area to which Clovers can be assigned to and buildings
 * can be built, possibly by upgrades or deliberate action.
 */
export default function Lane({ type, ...props }: ILane) {
    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            style={{
                backgroundImage: `url(${LaneTypes[type].background})`,
            }}
        >
            {/* Fill placeholder Clovers for demonstration purposes. */}
            {new Array(10).fill(undefined).map((_, i) => (
                <Clover key={i} job={LaneTypes[type].job} />
            ))}
        </div>
    );
}

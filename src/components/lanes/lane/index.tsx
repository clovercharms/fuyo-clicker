import classes from "./index.module.css";
import { HTMLProps } from "react";
import Clover from "../../clover";
import { Lane as ILane } from "../slice";
import { LaneType } from "./data";
import building from "../../../assets/images/lanes/building.png";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useGameStore } from "../../../store";
import { Clover as IClover } from "../../clover/slice";
import { lanes as lanesData } from "./data";

export interface LaneProps extends Omit<HTMLProps<HTMLDivElement>, "type"> {
    type: LaneType;
    lane: ILane;
}

/**
 * A lane is a workable area to which Clovers can be assigned to and buildings
 * can be built, possibly by upgrades or deliberate action.
 */
export default function Lane({ type, lane, ...props }: LaneProps) {
    const lanes = useGameStore(state => state.lanes);

    const { isOver, setNodeRef } = useDroppable({
        id: `${type}-lane`,
    });

    /**
     * Hook for handling drag events, when the clover is above this lane,
     * assign it from the reproduction chamber to this lane.
     */
    useDndMonitor({
        onDragEnd: event =>
            isOver && lanes.assign(event.active.data.current as IClover, type),
    });

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            style={{
                // backgroundColor: isOver ? "red" : "gray",
                backgroundImage: `url(${lanesData[type].background})`,
            }}
            ref={setNodeRef}
        >
            <div className={classes.overlap}>
                {new Array(lane.buildings).fill(undefined).map((_, i) => (
                    <img key={i} src={building} />
                ))}
            </div>
            <div className={classes.overlap}>
                {Object.values(lane.clovers)
                    .sort((a, b) => a.assigned - b.assigned)
                    .map(clover => (
                        <Clover key={clover.id} clover={clover} />
                    ))}
            </div>
        </div>
    );
}

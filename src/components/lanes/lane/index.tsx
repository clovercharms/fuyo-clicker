import classes from "./index.module.css";
import { HTMLProps } from "react";
import Clover from "../../clover";
import { Lane as ILane } from "../slice";
import { LaneType, lanes } from "./data";
import building from "../../../assets/images/lanes/building.png";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useGameStore } from "../../../store";

export interface LaneProps extends Omit<HTMLProps<HTMLDivElement>, "type"> {
    type: LaneType;
    lane: ILane;
}

/**
 * A lane is a workable area to which Clovers can be assigned to and buildings
 * can be built, possibly by upgrades or deliberate action.
 */
export default function Lane({ type, lane, ...props }: LaneProps) {
    const repro = useGameStore(state => state.repro);

    const { isOver, setNodeRef } = useDroppable({
        id: `${type}-lane`,
    });

    /**
     * Hook for handling drag events, when the clover is above this lane,
     * assign it from the reproduction chamber to this lane.
     */
    useDndMonitor({
        onDragEnd: event =>
            isOver &&
            repro.assign(type, repro.clovers[event.active.id as number]),
    });

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            style={{
                // backgroundColor: isOver ? "red" : "gray",
                backgroundImage: `url(${lanes[type].background})`,
            }}
            ref={setNodeRef}
        >
            <div className={classes.overlap}>
                {new Array(lane.buildings).fill(undefined).map((_, i) => (
                    <img key={i} src={building} />
                ))}
            </div>
            <div className={classes.overlap}>
                {Object.values(lane.clovers).map(clover => (
                    <Clover key={clover.id} clover={clover} />
                ))}
            </div>
        </div>
    );
}

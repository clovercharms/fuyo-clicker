import classes from "./index.module.css";
import { HTMLProps } from "react";
import Clover from "../../clover";
import { Lane as ILane } from "../slice";
import { LaneType, lanes as lanesData } from "./data";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useGameStore } from "../../../store";
import { Clover as IClover } from "../../clover/slice";
import HeroClover from "../../clover/hero";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";

const RNG_SEED = 1;

// [FIXME] Calculate based on container size.
const MAX_CLOVERS = 28;
const MAX_HERO_CLOVERS = 11;
const MAX_BUILDINGS = 19;

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
    const rand = xoroshiro128plus(RNG_SEED);

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
                backgroundImage: `url(${lanesData[type].background})`,
            }}
            ref={setNodeRef}
        >
            <div className={[classes.overlap, classes.buildings].join(" ")}>
                {new Array(Math.min(lane.buildings, MAX_BUILDINGS))
                    .fill(undefined)
                    .map((_, i) => (
                        <img
                            key={i}
                            className={classes.building}
                            src={lanesData[type].building}
                            style={{
                                animationDelay: `${dist(-1e4, 0, rand)}ms`,
                            }}
                        />
                    ))}
            </div>
            <div className={[classes.overlap, classes.clovers].join(" ")}>
                {Object.values(lane.clovers.regular)
                    .sort((a, b) => a.assigned - b.assigned)
                    .slice(0, MAX_CLOVERS)
                    .map(clover => (
                        <Clover
                            key={clover.id}
                            clover={clover}
                            style={{
                                animationDelay: `${dist(-1e4, 0, rand)}ms`,
                            }}
                        />
                    ))}
            </div>
            <div className={classes.overlap}>
                {Object.values(lane.clovers.heros)
                    .sort((a, b) => a.assigned - b.assigned)
                    .slice(0, MAX_HERO_CLOVERS)
                    .map(clover => (
                        <HeroClover key={clover.id} clover={clover} />
                    ))}
            </div>
        </div>
    );
}

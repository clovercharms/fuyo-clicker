import classes from "./index.module.css";
import { CSSProperties, HTMLProps } from "react";
import Clover from "../../clover";
import { CloverType, Lane as ILane } from "../slice";
import { LaneType, lanes as data } from "./data";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useGameStore } from "../../../store";
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
        onDragEnd: event => {
            if (!isOver) return;
            const eventData = event.active.data.current!;
            if (eventData.job !== data[type].job) return;

            lanes.assign(eventData.id as number, type)
        },
    });

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
            style={{
                backgroundImage: `url(${data[type].background})`,
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
                            src={data[type].building}
                            style={{
                                animationDelay: `${dist(-1e4, 0, rand)}ms`,
                            }}
                        />
                    ))}
            </div>
            <div className={[classes.overlap, classes.clovers].join(" ")}>
                {lane.clovers[CloverType.Regular]
                    .slice(0, MAX_CLOVERS)
                    .map(id => (
                        <Clover
                            key={id}
                            className={classes.clover}
                            id={id}
                            job={data[type].job}
                            style={
                                {
                                    "--animation-delay": `${dist(
                                        -1e4,
                                        0,
                                        rand
                                    )}ms`,
                                } as CSSProperties
                            }
                        />
                    ))}
            </div>
            <div
                className={[classes.overlap, classes["hero-clovers"]].join(" ")}
            >
                {lane.clovers[CloverType.Hero]
                    .slice(0, MAX_HERO_CLOVERS)
                    .map(id => (
                        <HeroClover
                            key={id}
                            className={classes['hero-clover']}
                            id={id}
                            job={data[type].job}
                            assigned={true}
                            style={
                                {
                                    "--animation-delay": `${dist(
                                        -1e4,
                                        0,
                                        rand
                                    )}ms`,
                                } as CSSProperties
                            }
                        />
                    ))}
            </div>
        </div>
    );
}

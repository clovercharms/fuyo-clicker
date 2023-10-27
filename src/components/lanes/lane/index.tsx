import classes from "./index.module.css";
import { CSSProperties, HTMLProps } from "react";
import Clover from "../../clover";
import { CloverType, Lane as ILane } from "../slice";
import { LaneType, lanes as data } from "./data";
import { useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useGameStore } from "@/store";
import HeroClover from "../../clover/hero";
import {
    xoroshiro128plus,
    unsafeUniformIntDistribution as dist,
} from "pure-rand";
import cx from "classix";

const RNG_SEED = 1;
const BUILDING_SIZE_PX = 64;
const CLOVER_SIZE_PX = 32;
const HERO_CLOVER_SIZE_PX = 80;

function useDynamicSizes(rect: DOMRect) {
    return {
        buldings: Math.ceil(rect.width / BUILDING_SIZE_PX),
        clovers: Math.ceil(rect.width / CLOVER_SIZE_PX),
        heroClovers: Math.ceil(rect.width / HERO_CLOVER_SIZE_PX),
    };
}

export interface LaneProps extends Omit<HTMLProps<HTMLDivElement>, "type"> {
    type: LaneType;
    lane: ILane;
    rect: DOMRect;
}

/**
 * A lane is a workable area to which Clovers can be assigned to and buildings
 * can be built, possibly by upgrades or deliberate action.
 */
export default function Lane({ type, lane, rect, ...props }: LaneProps) {
    const lanes = useGameStore(state => state.lanes);
    const rand = xoroshiro128plus(RNG_SEED);
    const sizing = useDynamicSizes(rect);

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

            lanes.assign(eventData.id as number, type);
        },
    });

    return (
        <div
            {...props}
            className={cx(classes.lane, props.className)}
            style={{
                backgroundImage: `url(${data[type].background})`,
            }}
            ref={setNodeRef}
        >
            <div
                className={cx(
                    classes.overlap,
                    classes.buildings,
                    data[type].flying && classes.flying
                )}
            >
                {new Array(Math.min(lane.buildings, sizing.buldings))
                    .fill(undefined)
                    .map((_, i) => (
                        <img
                            key={i}
                            className={classes.building}
                            src={data[type].building}
                            style={
                                {
                                    "--animation-delay": `${dist(
                                        -5e4,
                                        0,
                                        rand
                                    )}ms`,
                                } as CSSProperties
                            }
                        />
                    ))}
            </div>
            <div className={cx(classes.overlap, classes.clovers)}>
                {lane.clovers[CloverType.Regular]
                    .slice(0, sizing.clovers)
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
            <div className={cx(classes.overlap, classes["hero-clovers"])}>
                {lane.clovers[CloverType.Hero]
                    .slice(0, sizing.heroClovers)
                    .map(id => (
                        <HeroClover
                            key={id}
                            className={classes["hero-clover"]}
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

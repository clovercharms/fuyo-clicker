import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { LaneType } from "./lane/data";
import { resetters } from "../../resetters";

export enum CloverType {
    Regular,
    Hero,
}

/**
 * State about a lane, such as the amount of buildings and the clovers assigned
 * to the lane.
 */
export interface Lane {
    buildings: number;
    clovers: Record<CloverType, number[]>;
}

/**
 * Slice of the state of all lanes in the game.
 */
export interface LanesSlice {
    lanes: {
        types: Record<LaneType, Lane>;
        /**
         * Assigns a repro Clover to a specific lane.
         * @param id The id of the Clover.
         * @param clover The Clover to assign.
         */
        assign: (id: number, laneType: LaneType) => void;
    };
}

/**
 * Default lane state.
 */
const defaultLane: Lane = {
    buildings: 0,
    clovers: Object.fromEntries(
        Object.values(CloverType)
            .filter(t => typeof t === "number")
            .map(type => [type, []])
    ) as Record<CloverType, []>,
};

const initialLanesState = {
    types: Object.fromEntries(
        Object.values(LaneType)
            .filter(t => typeof t === "number")
            .map(type => [type, defaultLane])
    ) as Record<LaneType, Lane>,
};

export const createLanesSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({ lanes: { ...get().lanes, ...initialLanesState } }));
    return {
        lanes: {
            ...initialLanesState,
            assign: (id: number, laneType: LaneType) => {
                set(
                    state => ({
                        repro: {
                            ...state.repro,
                            clovers: {
                                ...state.repro.clovers,
                                heroes: {
                                    ...state.repro.clovers.heroes,
                                    spawned: undefined,
                                },
                            },
                        },
                        lanes: {
                            ...state.lanes,
                            types: {
                                ...state.lanes.types,
                                [laneType]: {
                                    ...state.lanes.types[laneType],
                                    clovers: {
                                        ...state.lanes.types[laneType].clovers,
                                        [CloverType.Hero]: [
                                            ...state.lanes.types[laneType]
                                                .clovers[CloverType.Hero],
                                            id,
                                        ],
                                    },
                                },
                            },
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Clover - Assign"
                );

                // Immediately forward game state.
                get().coins.tick();
            },
        },
    };
};

import { StoreApi } from "zustand";
import { GameState, resetters } from "../../store";
import { lanes as lanesData, LaneType } from "./lane/data";
import { Clover } from "../clover/slice";

/**
 * State about a lane, such as the amount of buildings and the clovers assigned
 * to the lane.
 */
export interface Lane {
    buildings: number;
    clovers: {
        regular: Record<number, Clover>;
        heros: Record<number, Clover>;
    };
}

/**
 * Slice of the state of all lanes in the game.
 */
export interface LanesSlice {
    lanes: {
        rows: Record<LaneType, Lane>;
        /**
         * Assigns a Clover to a specific lane.
         * @param laneType The type of lane.
         * @param clover The Clover to assign.
         */
        assign: (clover: Clover, laneType: LaneType) => void;
    };
}

/**
 * Default lane state.
 */
const defaultLane: Lane = {
    buildings: 0,
    clovers: {
        regular: {},
        heros: {},
    },
};

const initialLanesState = {
    rows: Object.fromEntries(
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
            assign: (heroClover: Clover, laneType: LaneType) => {
                // Remove from production chamber
                const heroClovers = get().repro.clovers.heros.spawned;
                delete heroClovers[heroClover.id];

                // Remove from lanes
                const rows = get().lanes.rows;
                for (const row of Object.values(rows)) {
                    delete row.clovers.heros[heroClover.id];
                }

                set(
                    state => ({
                        repro: {
                            ...state.repro,
                            clovers: {
                                ...state.repro.clovers,
                                heros: {
                                    ...state.repro.clovers.heros,
                                    spawned: heroClovers,
                                },
                            },
                        },
                        lanes: {
                            ...state.lanes,
                            rows: {
                                ...rows,
                                [laneType]: {
                                    ...state.lanes.rows[laneType],
                                    clovers: {
                                        ...state.lanes.rows[laneType].clovers,
                                        heros: {
                                            ...state.lanes.rows[laneType]
                                                .clovers.heros,
                                            [heroClover.id]: {
                                                ...heroClover,
                                                job: lanesData[laneType].job,
                                                assigned: Date.now(),
                                            },
                                        },
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

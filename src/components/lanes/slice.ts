import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { lanes as lanesData, LaneType } from "./lane/data";
import { Clover } from "../clover/slice";

/**
 * State about a lane, such as the amount of buildings and the clovers assigned
 * to the lane.
 */
export interface Lane {
    buildings: number;
    clovers: Record<number, Clover>;
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
const defaultLane = {
    buildings: 0,
    clovers: {},
};

export const createLanesSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => ({
    lanes: {
        rows: {
            [LaneType.Mine]: defaultLane,
            [LaneType.Forge]: defaultLane,
            [LaneType.ConstructionSite]: defaultLane,
            [LaneType.RepairShop]: defaultLane,
            [LaneType.Lab]: defaultLane,
        },
        assign: (clover: Clover, laneType: LaneType) => {
            // Remove from production chamber
            const clovers = get().repro.clovers;
            delete clovers[clover.id];

            // Remove from lanes
            const rows = get().lanes.rows;
            for (const row of Object.values(rows)) {
                delete row.clovers[clover.id];
            }

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        clovers,
                    },
                    lanes: {
                        ...state.lanes,
                        rows: {
                            ...rows,
                            [laneType]: {
                                ...state.lanes.rows[laneType],
                                clovers: {
                                    ...state.lanes.rows[laneType].clovers,
                                    [clover.id]: {
                                        ...clover,
                                        job: lanesData[laneType].job,
                                        assigned: Date.now(),
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
});

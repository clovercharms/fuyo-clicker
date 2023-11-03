import { StoreApi } from "zustand";
import { GameState } from "@/store";
import { LaneType } from "./lane/data";
import { resetters } from "../../resetters";
import { produce } from "immer";
import { CloverType } from "../clover/data";

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
                    produce<GameState>(state => {
                        state.repro.clovers.heroes.spawned = undefined;
                        state.lanes.types[laneType].clovers[
                            CloverType.Hero
                        ].push(id);
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

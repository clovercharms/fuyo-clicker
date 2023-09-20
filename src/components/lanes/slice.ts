import { Clover } from "../reproduction/slice";
import { LaneType } from "./lane/data";

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
    lanes: Record<LaneType, Lane>;
}

/**
 * Default lane state.
 */
const defaultLane = {
    buildings: 0,
    clovers: {},
};

export const createLanesSlice = () => ({
    lanes: {
        [LaneType.Mine]: defaultLane,
        [LaneType.Forge]: defaultLane,
        [LaneType.ConstructionSite]: defaultLane,
        [LaneType.RepairShop]: defaultLane,
        [LaneType.Lab]: defaultLane,
    },
});

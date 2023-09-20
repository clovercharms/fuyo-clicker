import {
    construction_site,
    forge,
    garage,
    lab,
    mines,
} from "../../../assets/images/lanes";
import { Job } from "../../clover/data";

/**
 * Types of lanes that are accessible for Clovers to be assigned to.
 */
export enum LaneType {
    Mine,
    Forge,
    ConstructionSite,
    RepairShop,
    Lab,
}

/**
 * Metadata about a Lane such as which job it fullfills and which background
 * image to use.
 */
export interface LaneData {
    job: Job;
    background: string;
    /** Rate of production per building per millisecond. */
    rateMs: number;
    /** The amount of slots that can be filled with Clovers. */
    slots: number;
}

/**
 * Metadata for each LaneType that contains which job it fullfills and which
 * background image it uses.
 */
export const lanes: { [type in LaneType]: LaneData } = {
    [LaneType.Mine]: {
        job: Job.Miner,
        background: mines,
        rateMs: 0.001,
        slots: 2,
    },
    [LaneType.Forge]: {
        job: Job.Blacksmith,
        background: forge,
        rateMs: 0.5,
        slots: 2,
    },
    [LaneType.ConstructionSite]: {
        job: Job.FactoryWorker,
        background: construction_site,
        rateMs: 0.75,
        slots: 2,
    },
    [LaneType.RepairShop]: {
        job: Job.Mechanic,
        background: garage,
        rateMs: 1.0,
        slots: 2,
    },
    [LaneType.Lab]: {
        job: Job.Scientist,
        background: lab,
        rateMs: 1.25,
        slots: 2,
    },
};

/**
 * Calculates the production of buildings and Clovers based on the type of lane,
 * the amount of buildings, and the amount of Clovers working with them.
 * @param type The type of lane.
 * @param buildings How many buildings the lane has.
 * @param clovers The amount of Clovers assigned to the lane.
 * @returns The production rate of the lane per millisecond.
 */
export function calculateLaneRate(
    type: LaneType,
    buildings: number,
    clovers: number
) {
    const buildingSlots = buildings * lanes[type].slots;
    const factor = clovers === 0 ? 0 : Math.min(clovers / buildingSlots, 1);
    return buildings * factor * lanes[type].rateMs;
}

import {
    constructionSite,
    forge,
    garage,
    lab,
    mines,
} from "../../../assets/images/lanes";
import {
    mine,
    forge as forgeBuilding,
    placeholder,
} from "../../../assets/images/lanes/buildings";
import { Job } from "../../clover/data";
import { Clover } from "../../clover/slice";

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
    building: string;
    /** Rate of production per building per millisecond. */
    rateMs: number;
    clovers: {
        regular: Record<number, Clover>;
        heros: Record<number, Clover>;
    };
}

/**
 * Metadata for each LaneType that contains which job it fullfills and which
 * background image it uses.
 */
export const lanes: { [type in LaneType]: LaneData } = {
    [LaneType.Mine]: {
        job: Job.Miner,
        background: mines,
        building: mine,
        rateMs: 0.001,
        clovers: {
            regular: {},
            heros: {},
        },
    },
    [LaneType.Forge]: {
        job: Job.Blacksmith,
        background: forge,
        building: forgeBuilding,
        rateMs: 0.002,
        clovers: {
            regular: {},
            heros: {},
        },
    },
    [LaneType.ConstructionSite]: {
        job: Job.FactoryWorker,
        background: constructionSite,
        building: placeholder,
        rateMs: 0.004,
        clovers: {
            regular: {},
            heros: {},
        },
    },
    [LaneType.RepairShop]: {
        job: Job.Mechanic,
        background: garage,
        building: placeholder,
        rateMs: 0.008,
        clovers: {
            regular: {},
            heros: {},
        },
    },
    [LaneType.Lab]: {
        job: Job.Scientist,
        background: lab,
        building: placeholder,
        rateMs: 0.016,
        clovers: {
            regular: {},
            heros: {},
        },
    },
};

/**
 * 10% Bonus for every Hero Clover assigned to a Lane.
 */
const heroCloverBonus = 0.1;

/**
 * Calculates the production of buildings and Clovers based on the type of lane,
 * the amount of buildings, and the amount of Clovers working with them.
 * @param type The type of lane.
 * @param buildings How many buildings the lane has.
 * @param heroClovers How many Hero Clovers are assigned to this lane.
 * @returns The production rate of the lane per millisecond.
 */
export function calculateLaneRate(
    type: LaneType,
    buildings: number,
    heroClovers: number
) {
    return (
        buildings * lanes[type].rateMs * (1.0 + heroClovers * heroCloverBonus)
    );
}

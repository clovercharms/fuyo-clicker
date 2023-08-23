import { Job } from "../../clover/meta";

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
}

/**
 * Metadata for each LaneType that contains which job it fullfills and which
 * background image it uses.
 */
export const LaneTypes: { [type in LaneType]: LaneData } = {
    [LaneType.Mine]: {
        job: Job.Miner,
        background: "mines",
    },
    [LaneType.Forge]: {
        job: Job.Blacksmith,
        background: "forge",
    },
    [LaneType.ConstructionSite]: {
        job: Job.FactoryWorker,
        background: "construction_site",
    },
    [LaneType.RepairShop]: {
        job: Job.Mechanic,
        background: "garage",
    },
    [LaneType.Lab]: {
        job: Job.Scientist,
        background: "lab",
    },
};

import * as backgrounds from "../../../assets/images/lanes";
import * as buildings from "../../../assets/images/lanes/buildings";
import { Job } from "../../clover/data";

export const CLOVERS_PER_BUILDING = 2;

/**
 * Types of lanes that are accessible for Clovers to be assigned to.
 */
export enum LaneType {
    Miners,
    Lumberjacks,
    Blacksmiths,
    FactoryWorkers,
    Mechanics,
    Scientists,
    Divers,
    Astronauts,
    Cultists,
    Investors,
    Aliens,
    Hazmats,
    Wizards,
    Knights,
    Sketches,
    Peak,
}

/**
 * Metadata about a Lane such as which job it fullfills and which background
 * image to use.
 */
export interface LaneData {
    job: Job;
    background: string;
    building: string;
    flying?: boolean;
    /** Rate of production per building per millisecond. */
    rateMs: number;
    clovers: {
        regular: number[];
        heroes: number[];
    };
}

/**
 * Metadata for each LaneType that contains which job it fullfills and which
 * background image it uses.
 */
export const lanes: { [type in LaneType]: LaneData } = {
    /* [CC] Grandma */
    [LaneType.Miners]: {
        job: Job.Miner,
        background: backgrounds.mines,
        building: buildings.mine,
        rateMs: 1 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Farm */
    [LaneType.Lumberjacks]: {
        job: Job.Lumberjack,
        background: backgrounds.wip,
        building: buildings.castle,
        rateMs: 8 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Mine */
    [LaneType.Blacksmiths]: {
        job: Job.Blacksmith,
        background: backgrounds.forge,
        building: buildings.forge,
        rateMs: 47 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Factory */
    [LaneType.FactoryWorkers]: {
        job: Job.FactoryWorker,
        background: backgrounds.constructionSite,
        building: buildings.chemtoilet,
        rateMs: 260 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Bank */
    [LaneType.Mechanics]: {
        job: Job.Mechanic,
        background: backgrounds.garage,
        building: buildings.rack,
        rateMs: 14e2 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Temple */
    [LaneType.Scientists]: {
        job: Job.Scientist,
        background: backgrounds.lab,
        building: buildings.scienceDesk,
        rateMs: 78e2 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Wizard Tower */
    [LaneType.Divers]: {
        job: Job.Diver,
        background: backgrounds.seasea,
        building: buildings.sub,
        flying: true,
        rateMs: 44e3 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Shipment */
    [LaneType.Astronauts]: {
        job: Job.Astronaut,
        background: backgrounds.wip2,
        building: buildings.rocket,
        flying: true,
        rateMs: 26e4 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Alchemy Lab */
    [LaneType.Cultists]: {
        job: Job.Cultist,
        background: backgrounds.wip,
        building: buildings.altar,
        rateMs: 16e5 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Portal */
    [LaneType.Investors]: {
        job: Job.Investor,
        background: backgrounds.wip,
        building: buildings.bank,
        rateMs: 1e7 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Time Machine */
    [LaneType.Aliens]: {
        job: Job.Alien,
        background: backgrounds.wip2,
        building: buildings.ufo,
        flying: true,
        rateMs: 65e6 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Antimatter Condenser */
    [LaneType.Hazmats]: {
        job: Job.Hazmat,
        background: backgrounds.powerPlant,
        building: buildings.powerPlant,
        rateMs: 43e7 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Prism */
    [LaneType.Wizards]: {
        job: Job.Wizard,
        background: backgrounds.wip,
        building: buildings.wizardTower,
        rateMs: 29e8 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Chancemaker */
    [LaneType.Knights]: {
        job: Job.Knight,
        background: backgrounds.wip,
        building: buildings.castle,
        rateMs: 21e9 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Fractal Engine */
    [LaneType.Sketches]: {
        job: Job.Sketch,
        background: backgrounds.sketch,
        building: buildings.sketchHouse,
        rateMs: 15e10 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
    /* [CC] Javascript Console */
    [LaneType.Peak]: {
        job: Job.Peak,
        background: backgrounds.wip2,
        building: buildings.altar,
        rateMs: 11e11 / 1e3,
        clovers: {
            regular: [],
            heroes: [],
        },
    },
};

const HERO_CLOVER_BONUS = 1.2;

/**
 * Calculates the production of buildings and Clovers based on the type of lane,
 * the amount of buildings, and the amount of Clovers working with them.
 * @param type The type of lane.
 * @param buildings How many buildings the lane has.
 * @param upgrades The amount of unlocked upgrades for the lane.
 * @param heroClovers How many Hero Clovers are assigned to this lane.
 * @returns The production rate of the lane per millisecond.
 */
export function calculateLaneRate(
    type: LaneType,
    buildings: number,
    upgrades: number,
    heroClovers: number
) {
    return (
        buildings *
        lanes[type].rateMs *
        HERO_CLOVER_BONUS ** heroClovers *
        2 ** upgrades
    );
}

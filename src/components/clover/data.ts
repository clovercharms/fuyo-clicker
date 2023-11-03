import bases from "@/assets/images/clover/base";
import * as cosmetics from "@/assets/images/clover/cosmetics";

/**
 * Type of a Clover.
 */
export enum CloverType {
    Regular,
    Hero,
}

/**
 * A type of job a Clover can have.
 */
export enum Job {
    Blacksmith,
    FactoryWorker,
    Mechanic,
    Miner,
    Lumberjack,
    Scientist,
    Diver,
    Astronaut,
    Cultist,
    Investor,
    Alien,
    Hazmat,
    Wizard,
    Knight,
    Sketch,
    Peak,
}

/**
 * Cosmetical configuration of a Clover Job.
 */
export interface JobConfig {
    bases?: Record<CloverType, string>;
    extras?: string[];
    cosmetics?: string[];
}

/**
 * Mapping for Clover jobs to image URLs.
 */
export const Jobs: { [type in Job]: JobConfig } = {
    [Job.Miner]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.miner],
    },
    [Job.Lumberjack]: {
        bases: bases.regular,
        cosmetics: [cosmetics.lumberjack],
    },
    [Job.Blacksmith]: {
        bases: bases.regular,
        cosmetics: [cosmetics.blacksmith],
    },
    [Job.Mechanic]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.mechanic],
    },
    [Job.FactoryWorker]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.factory_worker],
    },
    [Job.Diver]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.scuba],
    },
    [Job.Scientist]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.scientist],
    },
    [Job.Investor]: {
        bases: bases.regular,
        cosmetics: [cosmetics.investor],
    },
    [Job.Hazmat]: {
        bases: bases.hazmat,
    },
    [Job.Knight]: {
        bases: bases.regular,
        cosmetics: [cosmetics.knight],
    },
    [Job.Cultist]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.cultist],
    },
    [Job.Wizard]: {
        bases: bases.regular,
        cosmetics: [cosmetics.wizard],
    },
    [Job.Astronaut]: {
        bases: bases.regular,
        extras: [cosmetics.lips],
        cosmetics: [cosmetics.astronaut],
    },
    [Job.Alien]: {
        bases: bases.alien,
    },
    [Job.Sketch]: {
        bases: bases.sketch,
    },
    [Job.Peak]: {
        bases: bases.peak,
    },
};

/**
 * The potential name pool for Clovers.
 */
export const names = [
    "Kuriimu",
    "Aldi",
    "Xander",
    "Boyong",
    "Bannana Bread",
    "Doomei",
    "EcchiArtistIdk",
    "ISneeze",
    "Khris",
    "Leno",
    "Matze",
    "Nekomimi",
    "Nilok",
    "Nutman",
    "Endor",
    "Pluto",
    "Robotic",
    "Skumm",
    "TsunekoFuwakage",
    "frammie",
];

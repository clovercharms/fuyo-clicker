import {
    blacksmith,
    factory_worker,
    mechanic,
    miner,
    scientist,
    scuba,
} from "../../assets/images/clover/jobs";

/**
 * A type of job a Clover can have.
 */
export enum Job {
    Blacksmith,
    FactoryWorker,
    Mechanic,
    Miner,
    Scientist,
    Diver,
}

/**
 * Mapping for Clover jobs to image URLs.
 */
export const Jobs: { [type in Job]?: string } = {
    [Job.Blacksmith]: blacksmith,
    [Job.FactoryWorker]: factory_worker,
    [Job.Mechanic]: mechanic,
    [Job.Miner]: miner,
    [Job.Scientist]: scientist,
    [Job.Diver]: scuba,
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

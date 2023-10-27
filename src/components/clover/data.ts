import * as images from "../../assets/images/clover/jobs";

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
    Astronaut,
    Cultist,
    Investor,
    Alien,
    Hazmat,
    Wizard,
    Knight,
    Sketch,
}

/**
 * Mapping for Clover jobs to image URLs.
 */
export const Jobs: { [type in Job]?: string } = {
    [Job.Blacksmith]: images.blacksmith,
    [Job.FactoryWorker]: images.factory_worker,
    [Job.Mechanic]: images.mechanic,
    [Job.Miner]: images.miner,
    [Job.Scientist]: images.scientist,
    [Job.Diver]: images.scuba,
    [Job.Astronaut]: images.astronaut,
    [Job.Cultist]: images.cultist,
    [Job.Investor]: images.investor,
    [Job.Alien]: images.alien,
    [Job.Hazmat]: images.hazmat,
    [Job.Wizard]: images.wizard,
    [Job.Knight]: images.knight,
    [Job.Sketch]: images.sketch,
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

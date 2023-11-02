import * as images from "../../assets/images/clover/jobs";

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

export interface JobConfig {
    src: string;
    substitute?: boolean;
}

/**
 * Mapping for Clover jobs to image URLs.
 */
export const Jobs: { [type in Job]: JobConfig } = {
    [Job.Blacksmith]: { src: images.blacksmith },
    [Job.FactoryWorker]: { src: images.factory_worker },
    [Job.Mechanic]: { src: images.mechanic },
    [Job.Miner]: { src: images.miner },
    [Job.Lumberjack]: { src: images.lumberjack },
    [Job.Scientist]: { src: images.scientist },
    [Job.Diver]: { src: images.scuba },
    [Job.Astronaut]: { src: images.astronaut },
    [Job.Cultist]: { src: images.cultist },
    [Job.Investor]: { src: images.investor },
    [Job.Alien]: { src: images.alien },
    [Job.Hazmat]: { src: images.hazmat, substitute: true },
    [Job.Wizard]: { src: images.wizard },
    [Job.Knight]: { src: images.knight },
    [Job.Sketch]: { src: images.sketch, substitute: true },
    [Job.Peak]: { src: images.peak, substitute: true },
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

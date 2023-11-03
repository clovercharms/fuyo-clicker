import * as jobs from "@/assets/images/clover/jobs";
import * as overlays from "@/assets/images/clover/jobs/overlays";

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
    overlay?: string;
}

/**
 * Mapping for Clover jobs to image URLs.
 */
export const Jobs: { [type in Job]: JobConfig } = {
    [Job.Blacksmith]: { src: jobs.blacksmith },
    [Job.FactoryWorker]: { src: jobs.factory_worker },
    [Job.Mechanic]: { src: jobs.mechanic },
    [Job.Miner]: { src: jobs.miner },
    [Job.Lumberjack]: { src: jobs.lumberjack },
    [Job.Scientist]: { src: jobs.scientist },
    [Job.Diver]: { src: jobs.scuba },
    [Job.Astronaut]: { src: jobs.astronaut, overlay: overlays.astronaut },
    [Job.Cultist]: { src: jobs.cultist },
    [Job.Investor]: { src: jobs.investor },
    [Job.Alien]: { src: jobs.alien },
    [Job.Hazmat]: { src: jobs.hazmat, substitute: true },
    [Job.Wizard]: { src: jobs.wizard },
    [Job.Knight]: { src: jobs.knight },
    [Job.Sketch]: { src: jobs.sketch, substitute: true },
    [Job.Peak]: { src: jobs.peak, substitute: true },
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

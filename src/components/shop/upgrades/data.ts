import { GameState } from "@/stores/game";
import icons from "@/assets/images/shop/upgrades/icons";
import { LaneType } from "../../lanes/lane/data";

/**
 * A type of upgrade.
 */
export enum UpgradeType {
    Clicker,
    Cursor,
    Miners,
    Lumberjacks,
    Blacksmiths,
    Mechanics,
    FactoryWorkers,
    Divers,
    Scientists,
    Investors,
    Hazmats,
    Knights,
    Cultists,
    Wizards,
    Astronauts,
    Aliens,
    Sketches,
    Peak,
}

export const LaneTypeUpgradeType: Partial<Record<LaneType, UpgradeType>> = {
    [LaneType.Miners]: UpgradeType.Miners,
    [LaneType.Lumberjacks]: UpgradeType.Lumberjacks,
    [LaneType.Blacksmiths]: UpgradeType.Blacksmiths,
    [LaneType.FactoryWorkers]: UpgradeType.FactoryWorkers,
    [LaneType.Mechanics]: UpgradeType.Mechanics,
    [LaneType.Scientists]: UpgradeType.Scientists,
    [LaneType.Divers]: UpgradeType.Divers,
    [LaneType.Astronauts]: UpgradeType.Astronauts,
    [LaneType.Cultists]: UpgradeType.Cultists,
    [LaneType.Investors]: UpgradeType.Investors,
    [LaneType.Aliens]: UpgradeType.Aliens,
    [LaneType.Hazmats]: UpgradeType.Hazmats,
    [LaneType.Wizards]: UpgradeType.Wizards,
    [LaneType.Knights]: UpgradeType.Knights,
    [LaneType.Sketches]: UpgradeType.Sketches,
    [LaneType.Peak]: UpgradeType.Peak,
};

/**
 * Metadata about an Upgrade.
 */
export interface Upgrade {
    name: string;
    description: string;
    price: number;
    image: string;
    condition: (state: GameState) => boolean;
}

export type Upgrades = Record<UpgradeType, Record<number, Upgrade>>;

/**
 * Collection of metadata of all the upgrades available in the game.
 */
export const upgrades: Upgrades = {
    [UpgradeType.Clicker]: {
        0: {
            name: "Reinforced index finger",
            description: `The mouse and cursors are twice as efficient. "prod prod"`,
            price: 100,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        1: {
            name: "Carpal tunnel prevention cream",
            description: `The mouse and cursors are twice as efficient. "it... it hurts to click..."`,
            price: 500,
            image: icons[UpgradeType.Clicker][1],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        2: {
            name: "Ambidextrous",
            description: `The mouse and cursors are twice as efficient. "Look ma, both hands!"`,
            price: 1e4,
            image: icons[UpgradeType.Clicker][2],
            condition: (state: GameState) => state.coins.clickers >= 10,
        },
        3: {
            name: "Thousand fingers",
            description: `The mouse and cursors gain +0.1 cookies for each non-cursor object owned. "clickity"`,
            price: 1e5,
            image: icons[UpgradeType.Clicker][3],
            condition: (state: GameState) => state.coins.clickers >= 25,
        },
        4: {
            name: "Million fingers",
            description: `Multiplies the gain from Thousand fingers by 5. "clickityclickity"`,
            price: 1e7,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 50,
        },
        5: {
            name: "Billion fingers",
            description: `Multiplies the gain from Thousand fingers by 10. "clickityclickityclickity"`,
            price: 1e8,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 100,
        },
        6: {
            name: "Trillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "clickityclickityclickityclickity"`,
            price: 1e9,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 150,
        },
        7: {
            name: "Quadrillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "clickityclickityclickityclickityclick"`,
            price: 1e10,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 200,
        },
        8: {
            name: "Quintillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "man, just go click click click click click, it's real easy, man."`,
            price: 1e13,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 250,
        },
        9: {
            name: "Sextillion fingers",
            description: `Multiplies the gain from Thousand fingers by 20. "sometimes things just click"`,
            price: 1e16,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 300,
        },
    },
    [UpgradeType.Cursor]: {
        0: {
            name: "Plastic mouse",
            description: `Clicking gains 30% of your CpS. "Slightly squeaky."`,
            price: 5e4,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e3,
        },
        1: {
            name: "Iron mouse",
            description: `Clicking gains +10% of your CpS. "Click like it's 1,349!"`,
            price: 5e6,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e5,
        },
        2: {
            name: "Titanium mouse",
            description: `Clicking gains +10% of your CpS. "Heavy, but powerful."`,
            price: 5e8,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e7,
        },
        3: {
            name: "Adamantium mouse",
            description: "Clicking gains +10% of your CpS.",
            price: 5e10,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e9,
        },
        4: {
            name: "Unobtainium mouse",
            description: `Clicking gains +10% of your CpS. "You could cut diamond with these."`,
            price: 5e12,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e11,
        },
        5: {
            name: "Eludium mouse",
            description: `Clicking gains +10% of your CpS. "These nice mice should suffice."`,
            price: 5e14,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e13,
        },
    },
    /* [CC] Grandma */
    [UpgradeType.Miners]: {
        0: {
            name: "Sugar gas",
            description:
                "A pink, volatile gas, found in the depths of some chocolate caves.",
            price: 1e3,
            image: icons[UpgradeType.Miners][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 1,
        },
        1: {
            name: "Megadrill",
            description: "You're in deep.",
            price: 5e3,
            image: icons[UpgradeType.Miners][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 5,
        },
        2: {
            name: "Ultradrill",
            description: "Finally caved in?",
            price: 2.5e4,
            image: icons[UpgradeType.Miners][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 25,
        },
        3: {
            name: "Ultimadrill",
            description: "Pierce the heavens, etc.",
            price: 1.25e5,
            image: icons[UpgradeType.Miners][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 50,
        },
        4: {
            name: "H-bomb mining",
            description:
                "Questionable efficiency, but spectacular nonetheless.",
            price: 6.25e5,
            image: icons[UpgradeType.Miners][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Miners].buildings >= 100,
        },
    },
    /* [CC] Farm */
    [UpgradeType.Lumberjacks]: {
        0: {
            name: "Lumberjacks - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.1e4,
            image: icons[UpgradeType.Lumberjacks][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 1,
        },
        1: {
            name: "Lumberjacks - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 5.5e4,
            image: icons[UpgradeType.Lumberjacks][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 5,
        },
        2: {
            name: "Lumberjacks - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 2.75e5,
            image: icons[UpgradeType.Lumberjacks][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 25,
        },
        3: {
            name: "Lumberjacks - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.375e6,
            image: icons[UpgradeType.Lumberjacks][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 50,
        },
        4: {
            name: "Lumberjacks - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 6.875e6,
            image: icons[UpgradeType.Lumberjacks][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lumberjacks].buildings >= 100,
        },
    },
    /* [CC] Mine */
    [UpgradeType.Blacksmiths]: {
        0: {
            name: "Forge - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.2e5,
            image: icons[UpgradeType.Blacksmiths][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 1,
        },
        1: {
            name: "Forge - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6e5,
            image: icons[UpgradeType.Blacksmiths][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 5,
        },
        2: {
            name: "Forge - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 3e6,
            image: icons[UpgradeType.Blacksmiths][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 25,
        },
        3: {
            name: "Forge - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.5e7,
            image: icons[UpgradeType.Blacksmiths][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 50,
        },
        4: {
            name: "Forge - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 7.5e7,
            image: icons[UpgradeType.Blacksmiths][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Blacksmiths].buildings >= 100,
        },
    },
    /* [CC] Factory */
    [UpgradeType.Mechanics]: {
        0: {
            name: "Repair Shop - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.4e7,
            image: icons[UpgradeType.Mechanics][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 1,
        },
        1: {
            name: "Repair Shop - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 7e7,
            image: icons[UpgradeType.Mechanics][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 5,
        },
        2: {
            name: "Repair Shop - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 3.5e8,
            image: icons[UpgradeType.Mechanics][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 25,
        },
        3: {
            name: "Repair Shop - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.75e9,
            image: icons[UpgradeType.Mechanics][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 50,
        },
        4: {
            name: "Repair Shop - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 8.75e9,
            image: icons[UpgradeType.Mechanics][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mechanics].buildings >= 100,
        },
    },
    /* [CC] Bank */
    [UpgradeType.FactoryWorkers]: {
        0: {
            name: "Construction Site - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.3e6,
            image: icons[UpgradeType.FactoryWorkers][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 1,
        },
        1: {
            name: "Construction Site - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6.5e6,
            image: icons[UpgradeType.FactoryWorkers][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 5,
        },
        2: {
            name: "Construction Site - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 3.25e7,
            image: icons[UpgradeType.FactoryWorkers][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 25,
        },
        3: {
            name: "Construction Site - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.625e8,
            image: icons[UpgradeType.FactoryWorkers][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 50,
        },
        4: {
            name: "Construction Site - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 8.125e8,
            image: icons[UpgradeType.FactoryWorkers][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.FactoryWorkers].buildings >= 100,
        },
    },
    /* [CC] Temple */
    [UpgradeType.Divers]: {
        0: {
            name: "Ocean - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 3.3e9,
            image: icons[UpgradeType.Divers][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 1,
        },
        1: {
            name: "Ocean - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1.65e10,
            image: icons[UpgradeType.Divers][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 5,
        },
        2: {
            name: "Ocean - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 8.25e10,
            image: icons[UpgradeType.Divers][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 25,
        },
        3: {
            name: "Ocean - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 4.125e11,
            image: icons[UpgradeType.Divers][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 50,
        },
        4: {
            name: "Ocean - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 2.0625e12,
            image: icons[UpgradeType.Divers][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Divers].buildings >= 100,
        },
    },
    // [CC] Wizard Tower
    [UpgradeType.Scientists]: {
        0: {
            name: "Lab - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 2e8,
            image: icons[UpgradeType.Scientists][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 1,
        },
        1: {
            name: "Lab - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1e9,
            image: icons[UpgradeType.Scientists][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 5,
        },
        2: {
            name: "Lab - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 5e9,
            image: icons[UpgradeType.Scientists][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 25,
        },
        3: {
            name: "Lab - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 2.5e10,
            image: icons[UpgradeType.Scientists][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 50,
        },
        4: {
            name: "Lab - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 1.25e11,
            image: icons[UpgradeType.Scientists][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Scientists].buildings >= 100,
        },
    },
    /* [CC] Shipment */
    [UpgradeType.Investors]: {
        0: {
            name: "Investors - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1e13,
            image: icons[UpgradeType.Investors][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 1,
        },
        1: {
            name: "Investors - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 5e13,
            image: icons[UpgradeType.Investors][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 5,
        },
        2: {
            name: "Investors - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 2.5e14,
            image: icons[UpgradeType.Investors][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 25,
        },
        3: {
            name: "Investors - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.25e15,
            image: icons[UpgradeType.Investors][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 50,
        },
        4: {
            name: "Investors - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 6.25e15,
            image: icons[UpgradeType.Investors][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Investors].buildings >= 100,
        },
    },
    /* [CC] Alchemy Lab */
    [UpgradeType.Hazmats]: {
        0: {
            name: "Hazmats - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.7e15,
            image: icons[UpgradeType.Hazmats][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 1,
        },
        1: {
            name: "Hazmats - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 8.5e15,
            image: icons[UpgradeType.Hazmats][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 5,
        },
        2: {
            name: "Hazmats - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 4.25e16,
            image: icons[UpgradeType.Hazmats][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 25,
        },
        3: {
            name: "Hazmats - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 2.125e17,
            image: icons[UpgradeType.Hazmats][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 50,
        },
        4: {
            name: "Hazmats - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 1.0625e18,
            image: icons[UpgradeType.Hazmats][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Hazmats].buildings >= 100,
        },
    },
    /* [CC] Portal */
    [UpgradeType.Knights]: {
        0: {
            name: "Knights - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 2.6e17,
            image: icons[UpgradeType.Knights][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 1,
        },
        1: {
            name: "Knights - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1.3e18,
            image: icons[UpgradeType.Knights][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 5,
        },
        2: {
            name: "Knights - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 6.5e18,
            image: icons[UpgradeType.Knights][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 25,
        },
        3: {
            name: "Knights - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 3.25e19,
            image: icons[UpgradeType.Knights][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 50,
        },
        4: {
            name: "Knights - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 1.625e20,
            image: icons[UpgradeType.Knights][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Knights].buildings >= 100,
        },
    },
    /* [CC] Time Machine */
    [UpgradeType.Cultists]: {
        0: {
            name: "Cultists - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 7.5e11,
            image: icons[UpgradeType.Cultists][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 1,
        },
        1: {
            name: "Cultists - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 3.75e12,
            image: icons[UpgradeType.Cultists][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 5,
        },
        2: {
            name: "Cultists - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 1.875e13,
            image: icons[UpgradeType.Cultists][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 25,
        },
        3: {
            name: "Cultists - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 9.375e13,
            image: icons[UpgradeType.Cultists][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 50,
        },
        4: {
            name: "Cultists - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 4.6875e14,
            image: icons[UpgradeType.Cultists][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Cultists].buildings >= 100,
        },
    },
    /* [CC] Antimatter Condenser */
    [UpgradeType.Wizards]: {
        0: {
            name: "Wizards - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 2.1e16,
            image: icons[UpgradeType.Wizards][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 1,
        },
        1: {
            name: "Wizards - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1.05e17,
            image: icons[UpgradeType.Wizards][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 5,
        },
        2: {
            name: "Wizards - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 5.25e17,
            image: icons[UpgradeType.Wizards][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 25,
        },
        3: {
            name: "Wizards - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 2.625e18,
            image: icons[UpgradeType.Wizards][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 50,
        },
        4: {
            name: "Wizards - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 1.3125e19,
            image: icons[UpgradeType.Wizards][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Wizards].buildings >= 100,
        },
    },
    /* [CC] Prism */
    [UpgradeType.Astronauts]: {
        0: {
            name: "Astronauts - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 5.1e10,
            image: icons[UpgradeType.Astronauts][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 1,
        },
        1: {
            name: "Astronauts - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 2.55e11,
            image: icons[UpgradeType.Astronauts][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 5,
        },
        2: {
            name: "Astronauts - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 1.275e12,
            image: icons[UpgradeType.Astronauts][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 25,
        },
        3: {
            name: "Astronauts - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 6.375e12,
            image: icons[UpgradeType.Astronauts][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 50,
        },
        4: {
            name: "Astronauts - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 3.1875e13,
            image: icons[UpgradeType.Astronauts][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Astronauts].buildings >= 100,
        },
    },
    /* [CC] Chancemaker */
    [UpgradeType.Aliens]: {
        0: {
            name: "Aliens - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 14e13,
            image: icons[UpgradeType.Aliens][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 1,
        },
        1: {
            name: "Aliens - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 7e14,
            image: icons[UpgradeType.Aliens][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 5,
        },
        2: {
            name: "Aliens - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 3.5e15,
            image: icons[UpgradeType.Aliens][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 25,
        },
        3: {
            name: "Aliens - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1.75e16,
            image: icons[UpgradeType.Aliens][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 50,
        },
        4: {
            name: "Aliens - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 8.75e16,
            image: icons[UpgradeType.Aliens][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Aliens].buildings >= 100,
        },
    },
    /* [CC] Fractal Engine */
    [UpgradeType.Sketches]: {
        0: {
            name: "Sketches - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 3.1e18,
            image: icons[UpgradeType.Sketches][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 1,
        },
        1: {
            name: "Sketches - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1.55e19,
            image: icons[UpgradeType.Sketches][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 5,
        },
        2: {
            name: "Sketches - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 7.75e19,
            image: icons[UpgradeType.Sketches][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 25,
        },
        3: {
            name: "Sketches - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 3.875e20,
            image: icons[UpgradeType.Sketches][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 50,
        },
        4: {
            name: "Sketches - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 1.9375e21,
            image: icons[UpgradeType.Sketches][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Sketches].buildings >= 100,
        },
    },
    /* [CC] Javascript Console */
    [UpgradeType.Peak]: {
        0: {
            name: "Peak - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 7.1e20,
            image: icons[UpgradeType.Peak][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 1,
        },
        1: {
            name: "Peak - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 3.55e21,
            image: icons[UpgradeType.Peak][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 5,
        },
        2: {
            name: "Peak - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 1.775e22,
            image: icons[UpgradeType.Peak][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 25,
        },
        3: {
            name: "Peak - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 8.875e22,
            image: icons[UpgradeType.Peak][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 50,
        },
        4: {
            name: "Peak - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 4.4375e23,
            image: icons[UpgradeType.Peak][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Peak].buildings >= 100,
        },
    },
};

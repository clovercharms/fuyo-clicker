import { GameState } from "../../../store";
import icons from "../../../assets/images/shop/upgrades/icons";
import placeholder from "../../../assets/images/lanes/buildings/placeholder.png";
import { LaneType } from "../../lanes/lane/data";

/**
 * A type of upgrade.
 */
export enum UpgradeType {
    Clicker,
    Cursor,
    Mine,
    Forge,
    ConstructionSite,
    RepairShop,
    Lab,
    Ocean,
}

export const LaneTypeUpgradeType: Partial<Record<LaneType, UpgradeType>> = {
    [LaneType.Mine]: UpgradeType.Mine,
    [LaneType.Forge]: UpgradeType.Forge,
    [LaneType.ConstructionSite]: UpgradeType.ConstructionSite,
    [LaneType.RepairShop]: UpgradeType.RepairShop,
    [LaneType.Lab]: UpgradeType.Lab,
    [LaneType.Ocean]: UpgradeType.Ocean,
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
            description: `Clicking gains +1% of your CpS. "Slightly squeaky."`,
            price: 5e4,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e3,
        },
        1: {
            name: "Iron mouse",
            description: `Clicking gains +1% of your CpS. "Click like it's 1,349!"`,
            price: 5e6,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e5,
        },
        2: {
            name: "Titanium mouse",
            description: `Clicking gains +1% of your CpS. "Heavy, but powerful."`,
            price: 5e8,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e7,
        },
        3: {
            name: "Adamantium mouse",
            description: "Slightly squeaky.",
            price: 5e10,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e9,
        },
        4: {
            name: "Unobtainium mouse",
            description: `Clicking gains +1% of your CpS. "You could cut diamond with these."`,
            price: 5e12,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e11,
        },
        5: {
            name: "Eludium mouse",
            description: `Clicking gains +1% of your CpS. "These nice mice should suffice."`,
            price: 5e14,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.manualAmount >= 1e13,
        },
    },
    // [CC] Grandma
    [UpgradeType.Mine]: {
        0: {
            name: "Sugar gas",
            description:
                "A pink, volatile gas, found in the depths of some chocolate caves.",
            price: 1e3,
            image: icons[UpgradeType.Mine][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mine].buildings >= 1,
        },
        1: {
            name: "Megadrill",
            description: "You're in deep.",
            price: 5e3,
            image: icons[UpgradeType.Mine][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mine].buildings >= 5,
        },
        2: {
            name: "Ultradrill",
            description: "Finally caved in?",
            price: 5e4,
            image: icons[UpgradeType.Mine][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mine].buildings >= 25,
        },
        3: {
            name: "Ultimadrill",
            description: "Pierce the heavens, etc.",
            price: 5e6,
            image: icons[UpgradeType.Mine][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mine].buildings >= 50,
        },
        4: {
            name: "H-bomb mining",
            description:
                "Questionable efficiency, but spectacular nonetheless.",
            price: 5e8,
            image: icons[UpgradeType.Mine][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Mine].buildings >= 100,
        },
    },
    // [CC] Farm
    [UpgradeType.Forge]: {
        0: {
            name: "Forge - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 11e3,
            image: icons[UpgradeType.Forge][0],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Forge].buildings >= 1,
        },
        1: {
            name: "Forge - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 55e3,
            image: icons[UpgradeType.Forge][1],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Forge].buildings >= 5,
        },
        2: {
            name: "Forge - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 55e4,
            image: icons[UpgradeType.Forge][2],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Forge].buildings >= 25,
        },
        3: {
            name: "Forge - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 55e6,
            image: icons[UpgradeType.Forge][3],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Forge].buildings >= 50,
        },
        4: {
            name: "Forge - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 5.5e9,
            image: icons[UpgradeType.Forge][4],
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Forge].buildings >= 100,
        },
    },
    // [CC] Mine
    [UpgradeType.ConstructionSite]: {
        0: {
            name: "Construction Site - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 12e4,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.ConstructionSite].buildings >= 1,
        },
        1: {
            name: "Construction Site - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6e5,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.ConstructionSite].buildings >= 5,
        },
        2: {
            name: "Construction Site - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 6e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.ConstructionSite].buildings >= 25,
        },
        3: {
            name: "Construction Site - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 6e8,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.ConstructionSite].buildings >= 50,
        },
        4: {
            name: "Construction Site - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 60e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.ConstructionSite].buildings >= 100,
        },
    },
    // [CC] Factory
    [UpgradeType.RepairShop]: {
        0: {
            name: "Repair Shop - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 1.3e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.RepairShop].buildings >= 1,
        },
        1: {
            name: "Repair Shop - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6.5e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.RepairShop].buildings >= 5,
        },
        2: {
            name: "Repair Shop - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 65e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.RepairShop].buildings >= 25,
        },
        3: {
            name: "Repair Shop - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 6.5e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.RepairShop].buildings >= 50,
        },
        4: {
            name: "Repair Shop - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 65e10,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.RepairShop].buildings >= 100,
        },
    },
    // [CC] Bank
    [UpgradeType.Lab]: {
        0: {
            name: "Lab - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 14e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lab].buildings >= 1,
        },
        1: {
            name: "Lab - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 7e7,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lab].buildings >= 5,
        },
        2: {
            name: "Lab - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 7e8,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lab].buildings >= 25,
        },
        3: {
            name: "Lab - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 7e10,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lab].buildings >= 50,
        },
        4: {
            name: "Lab - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 7e12,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Lab].buildings >= 100,
        },
    },
    // [CC] Temple
    [UpgradeType.Ocean]: {
        0: {
            name: "Ocean - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 2e8,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Ocean].buildings >= 1,
        },
        1: {
            name: "Ocean - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Ocean].buildings >= 5,
        },
        2: {
            name: "Ocean - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 1e12,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Ocean].buildings >= 25,
        },
        3: {
            name: "Ocean - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1e14,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Ocean].buildings >= 50,
        },
        4: {
            name: "Ocean - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 10e15,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.types[LaneType.Ocean].buildings >= 100,
        },
    },
};

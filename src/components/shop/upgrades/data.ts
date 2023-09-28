import { GameState } from "../../../store";
import icons from "../../../assets/images/shop/upgrades/icons";
import placeholder from "../../../assets/images/lanes/buildings/placeholder.png";
import { LaneType } from "../../lanes/lane/data";

/**
 * A type of upgrade.
 */
export enum UpgradeType {
    Clicker,
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
            description: "prod prod",
            price: 100,
            image: icons[UpgradeType.Clicker][0],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        1: {
            name: "Carpal tunnel prevention cream",
            description: "it... it hurts to click...",
            price: 500,
            image: icons[UpgradeType.Clicker][1],
            condition: (state: GameState) => state.coins.clickers > 0,
        },
        2: {
            name: "Ambidextrous",
            description: "Look ma, both hands!",
            price: 1e4,
            image: icons[UpgradeType.Clicker][2],
            condition: (state: GameState) => state.coins.clickers >= 10,
        },
        3: {
            name: "Thousand fingers",
            description: "clickity",
            price: 1e5,
            image: icons[UpgradeType.Clicker][3],
            condition: (state: GameState) => state.coins.clickers >= 25,
        },
        4: {
            name: "Million fingers",
            description: "clickityclickity",
            price: 1e7,
            image: icons[UpgradeType.Clicker][4],
            condition: (state: GameState) => state.coins.clickers >= 50,
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
                state.lanes.rows[LaneType.Mine].buildings >= 1,
        },
        1: {
            name: "Megadrill",
            description: "You're in deep.",
            price: 5e3,
            image: icons[UpgradeType.Mine][1],
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Mine].buildings >= 5,
        },
        2: {
            name: "Ultradrill",
            description: "Finally caved in?",
            price: 5e4,
            image: icons[UpgradeType.Mine][2],
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Mine].buildings >= 25,
        },
        3: {
            name: "Ultimadrill",
            description: "Pierce the heavens, etc.",
            price: 5e6,
            image: icons[UpgradeType.Mine][3],
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Mine].buildings >= 50,
        },
        4: {
            name: "H-bomb mining",
            description:
                "Questionable efficiency, but spectacular nonetheless.",
            price: 5e8,
            image: icons[UpgradeType.Mine][4],
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Mine].buildings >= 100,
        },
    },
    // [CC] Farm
    [UpgradeType.Forge]: {
        0: {
            name: "Forge - Upgrade 1",
            description: "A funny and witty description goes here. :)",
            price: 11e3,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Forge].buildings >= 1,
        },
        1: {
            name: "Forge - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 55e3,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Forge].buildings >= 5,
        },
        2: {
            name: "Forge - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 55e4,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Forge].buildings >= 25,
        },
        3: {
            name: "Forge - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 55e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Forge].buildings >= 50,
        },
        4: {
            name: "Forge - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 5.5e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Forge].buildings >= 100,
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
                state.lanes.rows[LaneType.ConstructionSite].buildings >= 1,
        },
        1: {
            name: "Construction Site - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6e5,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.ConstructionSite].buildings >= 5,
        },
        2: {
            name: "Construction Site - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 6e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.ConstructionSite].buildings >= 25,
        },
        3: {
            name: "Construction Site - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 6e8,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.ConstructionSite].buildings >= 50,
        },
        4: {
            name: "Construction Site - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 60e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.ConstructionSite].buildings >= 100,
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
                state.lanes.rows[LaneType.RepairShop].buildings >= 1,
        },
        1: {
            name: "Repair Shop - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 6.5e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.RepairShop].buildings >= 5,
        },
        2: {
            name: "Repair Shop - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 65e6,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.RepairShop].buildings >= 25,
        },
        3: {
            name: "Repair Shop - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 6.5e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.RepairShop].buildings >= 50,
        },
        4: {
            name: "Repair Shop - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 65e10,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.RepairShop].buildings >= 100,
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
                state.lanes.rows[LaneType.Lab].buildings >= 1,
        },
        1: {
            name: "Lab - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 7e7,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Lab].buildings >= 5,
        },
        2: {
            name: "Lab - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 7e8,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Lab].buildings >= 25,
        },
        3: {
            name: "Lab - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 7e10,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Lab].buildings >= 50,
        },
        4: {
            name: "Lab - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 7e12,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Lab].buildings >= 100,
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
                state.lanes.rows[LaneType.Ocean].buildings >= 1,
        },
        1: {
            name: "Ocean - Upgrade 2",
            description: "A funny and witty description goes here. :)",
            price: 1e9,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Ocean].buildings >= 5,
        },
        2: {
            name: "Ocean - Upgrade 3",
            description: "A funny and witty description goes here. :)",
            price: 1e12,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Ocean].buildings >= 25,
        },
        3: {
            name: "Ocean - Upgrade 4",
            description: "A funny and witty description goes here. :)",
            price: 1e14,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Ocean].buildings >= 50,
        },
        4: {
            name: "Ocean - Upgrade 5",
            description: "A funny and witty description goes here. :)",
            price: 10e15,
            image: placeholder,
            condition: (state: GameState) =>
                state.lanes.rows[LaneType.Ocean].buildings >= 100,
        },
    },
};

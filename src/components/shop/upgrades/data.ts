import { GameState } from "../../../store";
import icons from '../../../assets/images/shop/upgrades/icons';
import { LaneType } from "../../lanes/lane/data";

/**
 * A type of upgrade.
 */
export enum UpgradeType {
    Clicker,
    Mine,
}

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
    [UpgradeType.Mine]: {
        0: {
            name: "Sugar gas",
            description: "A pink, volatile gas, found in the depths of some chocolate caves.",
            price: 12e4,
            image: icons[UpgradeType.Mine][0],
            condition: (state: GameState) => state.lanes.rows[LaneType.Mine].buildings >= 1,
        },
        1: {
            name: "Megadrill",
            description: "You're in deep.",
            price: 6e5,
            image: icons[UpgradeType.Mine][1],
            condition: (state: GameState) => state.lanes.rows[LaneType.Mine].buildings >= 5,
        },
        2: {
            name: "Ultradrill",
            description: "Finally caved in?",
            price: 6e6,
            image: icons[UpgradeType.Mine][2],
            condition: (state: GameState) => state.lanes.rows[LaneType.Mine].buildings >= 25,
        },
        3: {
            name: "Ultimadrill",
            description: "Pierce the heavens, etc.",
            price: 6e8,
            image: icons[UpgradeType.Mine][3],
            condition: (state: GameState) => state.lanes.rows[LaneType.Mine].buildings >= 50,
        },
        4: {
            name: "H-bomb mining",
            description: "Questionable efficiency, but spectacular nonetheless.",
            price: 6e10,
            image: icons[UpgradeType.Mine][4],
            condition: (state: GameState) => state.lanes.rows[LaneType.Mine].buildings >= 100,
        },
    }
};

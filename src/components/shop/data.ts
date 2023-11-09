import { Sound } from "@/utils/audio/sounds";
import { LaneType } from "../lanes/lane/data";
import { Item as ItemSlice } from "./slice";
import cursor from "@/assets/images/cursor.png";
import * as icons from "@/assets/images/shop/items/icons";

export enum Currency {
    COINS,
    CLOVERS,
}

/**
 * Metadata about an item in the shop.
 */
export interface Item {
    name: string;
    price: {
        amount: number;
        currency: Currency;
    };
    laneType?: LaneType;
    thumbnail: string;
    sounds?: Sound[];
}

/**
 * Collection of metadata about items available in the shop.
 */
export const items: Record<number, Item> = {
    0: {
        name: "Auto Clicker",
        price: {
            amount: 15,
            currency: Currency.COINS,
        },
        thumbnail: cursor,
        sounds: [Sound.AutoClicker1],
    },
    /* [CC] Grandma */
    1: {
        name: "Mine",
        price: {
            amount: 100,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Miners,
        thumbnail: icons.mine,
        sounds: [Sound.Miner1],
    },
    /* [CC] Farm */
    2: {
        name: "Axe",
        price: {
            amount: 1.1e3,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Lumberjacks,
        thumbnail: icons.wip,
        sounds: [Sound.Lumberjack1],
    },
    /* [CC] Mine */
    3: {
        name: "Forge",
        price: {
            amount: 1.18e4,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Blacksmiths,
        thumbnail: icons.forge,
        sounds: [Sound.Blacksmith1],
    },
    /* [CC] Factory */
    4: {
        name: "Repair Tools",
        price: {
            amount: 1.27e5,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Mechanics,
        thumbnail: icons.repairShop,
        sounds: [Sound.Mechanic1],
    },
    /* [CC] Bank */
    5: {
        name: "Crane",
        price: {
            amount: 1.37e6,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.FactoryWorkers,
        thumbnail: icons.constructionSite,
        sounds: [Sound.Engineer1],
    },
    /* [CC] Temple */
    6: {
        name: "Scuba Gear",
        price: {
            amount: 1.47e7,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Divers,
        thumbnail: icons.sub,
        sounds: [Sound.Diver1, Sound.Diver2],
    },
    /* [CC] Wizard Tower */
    7: {
        name: "Lab Equipment",
        price: {
            amount: 1.58e8,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Scientists,
        thumbnail: icons.lab,
        sounds: [Sound.Scientist1],
    },
    /* [CC] Shipment */
    8: {
        name: "Bank",
        price: {
            amount: 1.7e9,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Investors,
        thumbnail: icons.bank,
        sounds: [Sound.Investor1],
    },
    /* [CC] Alchemy Lab */
    9: {
        name: "Power Plant",
        price: {
            amount: 1.83e10,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Hazmats,
        thumbnail: icons.hazmat,
        sounds: [Sound.Hazmat1],
    },
    /* [CC] Portal */
    10: {
        name: "Castle",
        price: {
            amount: 1.97e11,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Knights,
        thumbnail: icons.wip,
        sounds: [Sound.Knight1],
    },
    /* [CC] Time Machine */
    11: {
        name: "Altar",
        price: {
            amount: 2.12e12,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Cultists,
        thumbnail: icons.altar,
        sounds: [Sound.Cultist1],
    },
    /* [CC] Antimatter Condenser */
    12: {
        name: "Wizard Tower",
        price: {
            amount: 2.28e13,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Wizards,
        thumbnail: icons.wip,
        sounds: [Sound.Wizard1],
    },
    /* [CC] Prism */
    13: {
        name: "Rocket",
        price: {
            amount: 2.45e14,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Astronauts,
        thumbnail: icons.rocket,
        sounds: [Sound.Astronaut1],
    },
    /* [CC] Chancemaker */
    14: {
        name: "UFO",
        price: {
            amount: 2.64e15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Aliens,
        thumbnail: icons.ufo,
        sounds: [Sound.Alien1],
    },
    /* [CC] Fractal Engine */
    15: {
        name: "Sketch",
        price: {
            amount: 2.84e16,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Sketches,
        thumbnail: icons.sketch,
        sounds: [Sound.Generico1],
    },
    /* [CC] Javascript Console */
    16: {
        name: "Peak",
        price: {
            amount: 3.06e17,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Peak,
        thumbnail: icons.wip,
        sounds: [Sound.Peak1],
    },
};

export const priceBase = 1.15;

/**
 * Calculates the price of a shop item based on the `id` and how many were
 * `purchased` before.
 * @param id The metadata id of the item.
 * @param purchased How many of this type of item were purchased before.
 * @returns The actual price of the item.
 */
export function calculatePrice(id: number, purchased: number) {
    const item = items[id];
    return Math.ceil(item.price.amount * priceBase ** purchased);
}

/** Currency to price ratio when to uncover an item. */
const UNCOVER_RATIO = 0.1;

/**
 * Based on the item data, and the amount of currency, return if the currency to
 * price ratio has reached the `UNCOVER_RATIO`.
 * @param itemData The data about the item.
 * @param amount The amount of currency.
 * @returns If the currency to price ratio has reached the `UNCOVER_RATIO`.
 */
function currencyRatio(itemData: Item, amount: number) {
    return amount !== 0 && amount / itemData.price.amount > UNCOVER_RATIO;
}

/**
 * Determines based on slice/metadata about an item, and the current amount of
 * currency, whether or not to uncover the item.
 * @param itemSlice The slice data about the item.
 * @param itemData The metadata about the item.
 * @param coins The amount of coins owned.
 * @param clovers The amount of clovers owned.
 * @returns Whether or not to uncover the item.
 */
export function isItemUnlocked(
    itemSlice: ItemSlice,
    itemData: Item,
    coins: number,
    clovers: number
) {
    return (
        itemSlice.purchased > 0 ||
        (itemData.price.currency === Currency.COINS
            ? currencyRatio(itemData, coins)
            : currencyRatio(itemData, clovers))
    );
}

import { LaneType } from "../../lanes/lane/data";
import { Item as ItemSlice } from "../slice";
import hand from "@/assets/images/hand.png";
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
        thumbnail: hand,
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
    },
    /* [CC] Farm */
    2: {
        name: "Forge",
        price: {
            amount: 1100,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Blacksmiths,
        thumbnail: icons.forge,
    },
    /* [CC] Mine */
    3: {
        name: "Crane",
        price: {
            amount: 12e3,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.FactoryWorkers,
        thumbnail: icons.constructionSite,
    },
    /* [CC] Factory */
    4: {
        name: "Repair Tools",
        price: {
            amount: 13e4,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Mechanics,
        thumbnail: icons.repairShop,
    },
    /* [CC] Bank */
    5: {
        name: "Lab Equipment",
        price: {
            amount: 1.4e6,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Scientists,
        thumbnail: icons.lab,
    },
    /* [CC] Temple */
    6: {
        name: "Scuba Gear",
        price: {
            amount: 2e7,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Divers,
        thumbnail: icons.sub,
    },
    /* [CC] Wizard Tower */
    7: {
        name: "Rocket",
        price: {
            amount: 33e7,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Astronauts,
        thumbnail: icons.wip,
    },
    /* [CC] Shipment */
    8: {
        name: "Altar",
        price: {
            amount: 51e8,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Cultists,
        thumbnail: icons.wip,
    },
    /* [CC] Alchemy Lab */
    9: {
        name: "Bank",
        price: {
            amount: 75e9,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Investors,
        thumbnail: icons.wip,
    },
    /* [CC] Portal */
    10: {
        name: "UFO",
        price: {
            amount: 1e12,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Aliens,
        thumbnail: icons.wip,
    },
    /* [CC] Time Machine */
    11: {
        name: "Nuclear Power Plant",
        price: {
            amount: 14e12,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Hazmats,
        thumbnail: icons.wip,
    },
    /* [CC] Antimatter Condenser */
    12: {
        name: "Wizard Tower",
        price: {
            amount: 17e13,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Wizards,
        thumbnail: icons.wip,
    },
    /* [CC] Prism */
    13: {
        name: "Castle",
        price: {
            amount: 21e14,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Knights,
        thumbnail: icons.wip,
    },
    /* [CC] Chancemaker */
    14: {
        name: "Sketch",
        price: {
            amount: 26e15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Sketches,
        thumbnail: icons.sketch,
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
    return Math.round(item.price.amount * priceBase ** purchased);
}

/** Currency to price ratio when to uncover an item. */
const UNCOVER_RATIO = 0.75;

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

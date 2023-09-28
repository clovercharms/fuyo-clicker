import { LaneType } from "../../lanes/lane/data";
import { Item as ItemSlice } from "../slice";
import hand from "../../../assets/images/hand.png";
import {
    forge,
    mine,
    scienceDesk,
    sub,
    placeholder,
} from "../../../assets/images/lanes/buildings";

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
        base: number;
        factor: number;
        currency: Currency;
    };
    laneType?: LaneType;
    // [FIXME] Move to Lanes
    clovers?: number;
    thumbnail: string;
}

/**
 * Collection of metadata about items available in the shop.
 */
export const items: Record<number, Item> = {
    0: {
        name: "Auto Clicker",
        price: {
            base: 15,
            factor: 1.15,
            currency: Currency.COINS,
        },
        thumbnail: hand,
    },
    1: {
        name: "Mine",
        price: {
            base: 100,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Mine,
        clovers: 2,
        thumbnail: mine,
    },
    2: {
        name: "Forge",
        price: {
            base: 1100,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Forge,
        clovers: 2,
        thumbnail: forge,
    },
    3: {
        name: "Crane",
        price: {
            base: 12e3,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.ConstructionSite,
        clovers: 4,
        thumbnail: placeholder,
    },
    4: {
        name: "Repair Tools",
        price: {
            base: 13e4,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.RepairShop,
        clovers: 4,
        thumbnail: placeholder,
    },
    5: {
        name: "Lab Equipment",
        price: {
            base: 1.4e6,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Lab,
        clovers: 4,
        thumbnail: scienceDesk,
    },
    6: {
        name: "Scuba Gear",
        price: {
            base: 2e7,
            factor: 1.15,
            currency: Currency.CLOVERS,
        },
        laneType: LaneType.Ocean,
        clovers: 1,
        thumbnail: sub,
    },
};

/**
 * Calculates the price of a shop item based on the `id` and how many were
 * `purchased` before.
 * @param id The metadata id of the item.
 * @param purchased How many of this type of item were purchased before.
 * @returns The actual price of the item.
 */
export function calculatePrice(id: number, purchased: number) {
    const item = items[id];
    return Math.round(item.price.base * item.price.factor ** purchased);
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
    return amount !== 0 && amount / itemData.price.base > UNCOVER_RATIO;
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

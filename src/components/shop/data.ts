import { LaneType } from "../lanes/lane/data";

/**
 * Metadata about an item in the shop.
 */
export interface Item {
    name: string;
    price: {
        base: number;
        factor: number;
    };
    laneType?: LaneType;
    clovers?: number;
}

/**
 * Collection of metadata about items available in the shop.
 */
export const data: Record<number, Item> = {
    0: {
        name: "Auto Clicker",
        price: {
            base: 15,
            factor: 1.1,
        },
    },
    1: {
        name: "Mine",
        price: {
            base: 100,
            factor: 1.15,
        },
        laneType: LaneType.Mine,
        clovers: 2,
    },
    2: {
        name: "Forge",
        price: {
            base: 200,
            factor: 1.2,
        },
        laneType: LaneType.Forge,
        clovers: 2,
    },
    3: {
        name: "Crane",
        price: {
            base: 500,
            factor: 1.25,
        },
        laneType: LaneType.ConstructionSite,
        clovers: 4,
    },
    4: {
        name: "Repair Tools",
        price: {
            base: 1000,
            factor: 1.3,
        },
        laneType: LaneType.RepairShop,
        clovers: 4,
    },
    5: {
        name: "Lab Equipment",
        price: {
            base: 2000,
            factor: 1.35,
        },
        laneType: LaneType.Lab,
        clovers: 4,
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
    const item = data[id];
    return Math.round(item.price.base * item.price.factor ** purchased);
}

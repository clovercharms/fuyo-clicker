import { priceBase } from "../shop/item/data";

export const CLOVER_RATE_BASE = 1.15;
export const HERO_CLOVER_RATE_MS = 1 / 120e3;

export const upgrades = {
    rate: 0.0005,
    price: {
        amount: 15,
    },
};

/**
 * Calculates the price of an upgrade to the reproduction chamber.
 * `purchased` before.
 * @param tier The tier to upgrade to
 */
export function calculatePrice(tier: number) {
    return Math.round(upgrades.price.amount * priceBase ** (tier - 1));
}

export const upgrades = {
    rate: 0.00015,
    price: {
        base: 15,
        factor: 1.3,
    },
};

/**
 * Calculates the price of an upgrade to the reproduction chamber.
 * `purchased` before.
 * @param tier The tier to upgrade to
 */
export function calculatePrice(tier: number) {
    return Math.round(
        upgrades.price.base * upgrades.price.factor ** (tier - 1)
    );
}

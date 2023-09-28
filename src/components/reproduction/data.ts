export const upgrades = {
    rate: 0.001,
    price: {
        base: 15,
        factor: 1.15,
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

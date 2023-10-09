import { Boost } from "./slice";

export enum BoostType {
    FUYONADE,
}

export const boosts = {
    [BoostType.FUYONADE]: {
        multiplier: 7,
        ratesMs: {
            increase: 1 / (5 * 60e3),
            decrease: 1 / 77e3,
        },
    },
};

export function determineBoost(type: BoostType, boost: Boost) {
    return boost.active ? boosts[type].multiplier : 1;
}

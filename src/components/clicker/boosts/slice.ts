import { StoreApi } from "zustand";
import { GameState } from "../../../store";
import { BoostType, boosts as data } from "./data";
import { resetters } from "../../../resetters";

export interface Boost {
    lastUpdate: number;
    progress: number;
    active: boolean;
}

export interface BoostsSlice {
    boosts: {
        types: Record<BoostType, Boost>;
        activate: (type: BoostType) => void;
    };
}

const initialBoostsState = {
    types: {
        [BoostType.FUYONADE]: {
            lastUpdate: performance.now(),
            progress: 0,
            active: false,
        },
    },
};

export const createBoostsSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        boosts: { ...get().boosts, ...initialBoostsState },
    }));
    return {
        boosts: {
            ...initialBoostsState,
            tick: () => {
                set(
                    state => ({
                        boosts: {
                            ...state.boosts,
                            types: Object.fromEntries(
                                Object.entries(state.boosts.types).map(
                                    ([type, boost]) => [
                                        type,
                                        updateBoost(
                                            type as unknown as BoostType,
                                            boost
                                        ),
                                    ]
                                )
                            ) as Record<BoostType, Boost>,
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Boosts"
                );
            },
            activate: (type: BoostType) => {
                set(
                    state => ({
                        boosts: {
                            ...state.boosts,
                            types: {
                                ...state.boosts.types,
                                [type]: {
                                    ...state.boosts.types[type],
                                    active: true,
                                },
                            },
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Activate Boost"
                );
                get().tick();
            },
        },
    };
};

function updateBoost(type: BoostType, boost: Boost) {
    const elapsed = Math.max(0, performance.now() - boost.lastUpdate);

    const progress =
        boost.progress +
        elapsed *
            (boost.active
                ? -data[type].ratesMs.decrease
                : data[type].ratesMs.increase);

    return {
        ...boost,
        lastUpdate: performance.now(),
        progress: progress <= 0 ? 0 : progress >= 1 ? 1 : progress,
        active: progress <= 0 ? false : boost.active,
    };
}

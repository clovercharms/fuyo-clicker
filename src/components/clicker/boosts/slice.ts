import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { produce } from "immer";
import { calcElapsed } from "@/utils/timer";

import { resetters } from "../../../stores/game/resetters";

import { BoostType, boosts as data } from "./data";

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

const initialBoostsState = () => ({
    types: {
        [BoostType.FUYONADE]: {
            lastUpdate: Date.now(),
            progress: 0,
            active: false,
        },
    },
});

export const createBoostsSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        boosts: { ...get().boosts, ...initialBoostsState() },
    }));
    return {
        boosts: {
            ...initialBoostsState(),
            tick: () => {
                set(
                    produce<GameState>(state => {
                        state.boosts.types = Object.fromEntries(
                            Object.entries(state.boosts.types).map(
                                ([type, boost]) => [
                                    type,
                                    updateBoost(
                                        get().lastLoaded,
                                        type as unknown as BoostType,
                                        boost
                                    ),
                                ]
                            )
                        ) as Record<BoostType, Boost>;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Boosts"
                );
            },
            activate: (type: BoostType) => {
                set(
                    produce<GameState>(state => {
                        state.boosts.types[type].active = true;
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

function updateBoost(lastLoaded: number, type: BoostType, boost: Boost) {
    const elapsed = calcElapsed(lastLoaded, boost.lastUpdate);

    const progress =
        boost.progress +
        elapsed *
            (boost.active
                ? -data[type].ratesMs.decrease
                : data[type].ratesMs.increase);

    return {
        ...boost,
        lastUpdate: Date.now(),
        progress: progress <= 0 ? 0 : progress >= 1 ? 1 : progress,
        active: progress <= 0 ? false : boost.active,
    };
}

import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { produce } from "immer";

import { resetters } from "../../stores/game/resetters";

/**
 * Slice of the state of species in the game.
 */
export interface SpeciesSlice {
    species: {
        lastUpdate: number;
        lastSpawn: number;
        spawn: boolean;
        /**
         * Chronologically updates species state.
         */
        tick: () => void;
        /**
         * Activates species bonus.
         */
        activate: () => void;
    };
}

/**
 * Default species state.
 */
const defaultSpecies = () => ({
    lastUpdate: Date.now(),
    lastSpawn: Date.now(),
    spawn: false,
});

export const createSpeciesSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        species: { ...get().species, ...defaultSpecies() },
    }));
    return {
        species: {
            ...defaultSpecies(),
            tick: () => {
                set(
                    produce<GameState>(state => {
                        const timeMs = Date.now();
                        const elapsedMs = Math.max(
                            0,
                            state.species.lastUpdate -
                                Math.max(
                                    get().lastLoaded,
                                    state.species.lastSpawn
                                )
                        );

                        state.species.lastUpdate = timeMs;
                        if (timeMs < state.species.lastSpawn) {
                            state.species.lastSpawn = 0;
                        }

                        if (
                            shouldSpawn(elapsedMs / 1e3) &&
                            !state.species.spawn
                        ) {
                            state.species.spawn = true;
                            state.species.lastSpawn = timeMs;
                        } else {
                            state.species.spawn = false;
                        }
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Species"
                );
            },
            activate: () => {
                set(
                    produce<GameState>(state => {
                        const bonus = determineBonus(get().coins.rateMs);
                        state.coins.amount += bonus;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Species - Activate"
                );
            },
        },
    };
};

const T_MIN_SEC = 150;
const T_MAX_SEC = 450;

function shouldSpawn(timeSec: number) {
    // https://cookieclicker.fandom.com/wiki/Golden_Cookie#Spawn_Time
    const probability = ((timeSec - T_MIN_SEC) / (T_MAX_SEC - T_MIN_SEC)) ** 5;
    if (probability < 0) return false;

    return Math.random() < probability;
}

// 3 Minutes production.
const BONUS_PRODUCTION_TIME = 3 * 60e3;

function determineBonus(rateMs: number) {
    return rateMs * BONUS_PRODUCTION_TIME;
}

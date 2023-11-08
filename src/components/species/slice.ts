import { StoreApi } from "zustand";
import { GameState } from "@/store";
import { resetters } from "../../resetters";
import { produce } from "immer";

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
const defaultSpecies = {
    lastUpdate: 0,
    lastSpawn: 0,
    spawn: false,
};

export const createSpeciesSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        species: { ...get().species, ...defaultSpecies },
    }));
    return {
        species: {
            ...defaultSpecies,
            tick: () => {
                set(
                    produce<GameState>(state => {
                        const timeMs = performance.now();
                        const elapsedMs = Math.max(
                            0,
                            state.species.lastUpdate - state.species.lastSpawn
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
                        const bonus = determineBonus(
                            get().coins.amount,
                            get().coins.rateMs
                        );
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

const T_MIN_SEC = 300;
const T_MAX_SEC = 900;

function shouldSpawn(timeSec: number) {
    // https://cookieclicker.fandom.com/wiki/Golden_Cookie#Spawn_Time
    const probability = ((timeSec - T_MIN_SEC) / (T_MAX_SEC - T_MIN_SEC)) ** 5;
    if (probability < 0) return false;

    return Math.random() < probability;
}

// 15% Of collected coins.
const BONUS_PERCENTAGE_COINS = 0.15;
// 15 Minutes production.
const BONUS_PRODUCTION_TIME = 15 * 60e3;

function determineBonus(coins: number, rateMs: number) {
    const percentage = BONUS_PERCENTAGE_COINS * coins;
    const production = rateMs * BONUS_PRODUCTION_TIME;

    return Math.min(percentage, production);
}

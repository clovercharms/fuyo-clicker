import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { names } from "../clover/data";
import { Clover } from "../clover/slice";
import { calculatePrice, upgrades } from "./data";

/**
 * Slice containing information about the current production progress,
 * the Clovers spawned and tick and assignment logic.
 */
export interface ReproSlice {
    repro: {
        clovers: {
            amount: number;
            rateMs: number;
            tier: number;
            heros: {
                progress: number;
                rateMs: number;
                spawned: Record<number, Clover>;
            };
            lastCloverId: number;
        };
        lastUpdate: number;
        /**
         * Chronologically updates production.
         */
        tick: () => void;
        /**
         * Manually spawns a new Hero Clover.
         */
        spawn: () => void;
        click: () => void;
        upgrade: () => boolean;
    };
}

export const createReproSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => ({
    repro: {
        clovers: {
            amount: 0,
            rateMs: 0,
            tier: 0,
            heros: {
                progress: 0,
                rateMs: 0,
                spawned: {},
            },
            lastCloverId: -1,
        },
        lastUpdate: performance.now(),
        tick: () => {
            const elapsed = performance.now() - get().repro.lastUpdate;

            // [TODO] Calculate clover rateMs
            const cloverRateMs =
                get().repro.clovers.tier === 0
                    ? 0
                    : upgrades.rate * 1.5 ** get().repro.clovers.tier;

            // [TODO] Which rate?
            const heroCloverRateMs = Math.min(
                get().repro.clovers.rateMs / 1e3,
                1 / 120e3
            );

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        lastUpdate: performance.now(),
                        clovers: {
                            ...state.repro.clovers,
                            rateMs: cloverRateMs,
                            amount:
                                state.repro.clovers.amount +
                                elapsed * cloverRateMs,
                            heros: {
                                ...state.repro.clovers.heros,
                                rateMs: heroCloverRateMs,
                                progress:
                                    state.repro.clovers.heros.progress +
                                    elapsed * heroCloverRateMs,
                            },
                        },
                    },
                }),
                false,
                // @ts-expect-error typing
                "Tick - Repro"
            );

            // Hero Clovers
            if (get().repro.clovers.heros.progress < 1) return;

            // Generate new Hero Clover
            const clover = generateClover(get().repro.clovers.lastCloverId);

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        clovers: {
                            ...state.repro.clovers,
                            heros: {
                                ...state.repro.clovers.heros,
                                progress:
                                    state.repro.clovers.heros.progress - 1,
                                spawned: {
                                    ...state.repro.clovers.heros.spawned,
                                    [clover.id]: clover,
                                },
                            },
                            lastCloverId: clover.id,
                        },
                    },
                }),
                false,
                // @ts-expect-error typing
                "Tick - Repro - Hero Clover"
            );
        },
        spawn: () => {
            // Generate new Hero Clover
            const clover = generateClover(get().repro.clovers.lastCloverId);

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        clovers: {
                            ...state.repro.clovers,
                            heros: {
                                ...state.repro.clovers.heros,
                                spawned: {
                                    ...state.repro.clovers.heros.spawned,
                                    [clover.id]: clover,
                                },
                            },
                            lastCloverId: clover.id,
                        },
                    },
                }),
                false,
                // @ts-expect-error typing
                "Action - Cheat - Hero Clover"
            );
        },
        click: () => {
            set(state => ({
                repro: {
                    ...state.repro,
                    clovers: {
                        ...state.repro.clovers,
                        amount: state.repro.clovers.amount + 1,
                    },
                },
            }));
        },
        upgrade: () => {
            get().tick();

            const nextTier = get().repro.clovers.tier + 1;
            const price = calculatePrice(nextTier);
            if (get().coins.amount < price) return false;

            set(state => ({
                coins: {
                    ...state.coins,
                    amount: state.coins.amount - price,
                },
                repro: {
                    ...state.repro,
                    clovers: {
                        ...state.repro.clovers,
                        tier: state.repro.clovers.tier + 1,
                    },
                },
            }));

            get().tick();

            return true;
        },
    },
});

export function generateClover(lastId: number) {
    // Generate new Hero Clover
    const id = lastId + 1;

    return {
        id,
        name: names[Math.round(Math.random() * (names.length - 1))],
        assigned: 0,
    } as Clover;
}

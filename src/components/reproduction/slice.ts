import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { names } from "../clover/data";
import { Clover } from "../clover/slice";

/**
 * Slice containing information about the current production progress,
 * the Clovers spawned and tick and assignment logic.
 */
export interface ReproSlice {
    repro: {
        progress: number;
        clovers: Record<number, Clover>;
        lastCloverId: number;
        rateMs: number;
        lastUpdate: number;
        /**
         * Chronologically updates production.
         */
        tick: () => void;
        /**
         * Manually spawns a new clover.
         */
        cheat: () => void;
    };
}

export const createReproSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => ({
    repro: {
        clovers: {},
        lastCloverId: 0,
        progress: 0,
        rateMs: 1 / 10e3,
        lastUpdate: performance.now(),
        tick: () => {
            const elapsed = performance.now() - get().repro.lastUpdate;

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        lastUpdate: performance.now(),
                        progress:
                            state.repro.progress + elapsed * state.repro.rateMs,
                    },
                }),
                false,
                // @ts-expect-error typing
                "Tick - Repro"
            );

            if (get().repro.progress < 1) return;

            // Generate new clover
            const id = get().repro.lastCloverId + 1;

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        progress: state.repro.progress - 1,
                        clovers: {
                            ...state.repro.clovers,
                            [id]: {
                                id,
                                name: names[
                                    Math.round(
                                        Math.random() * (names.length - 1)
                                    )
                                ],
                                assigned: 0,
                            },
                        },
                        lastCloverId: id,
                    },
                }),
                false,
                // @ts-expect-error typing
                "Tick - Repro - Clover"
            );
        },
        cheat: () => {
            const id = get().repro.lastCloverId + 1;

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        clovers: {
                            ...state.repro.clovers,
                            [id]: {
                                id,
                                name: names[
                                    Math.round(
                                        Math.random() * (names.length - 1)
                                    )
                                ],
                            },
                        },
                        lastCloverId: id,
                    },
                }),
                false,
                // @ts-expect-error typing
                "Action - Cheat - Clover"
            );
        },
    },
});

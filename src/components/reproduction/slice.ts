import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { Job, names } from "../clover/data";
import { LaneType, lanes } from "../lanes/lane/data";

/**
 * State about a Clover.
 */
export interface Clover {
    id: number;
    name: string;
    job: Job;
}

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
         * Assigns a Clover to a specific lane.
         * @param laneType The type of lane.
         * @param clover The Clover to assign.
         */
        assign: (laneType: LaneType, clover: Clover) => void;
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
        rateMs: 1 / 60e3,
        lastUpdate: performance.now(),
        tick: () => {
            let elapsed = performance.now() - get().repro.lastUpdate;
            // FIXME: Time restored from storage could be later than perf.now
            if (elapsed < 0) elapsed = 0;

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
        assign: (laneType: LaneType, clover: Clover) => {
            const clovers = get().repro.clovers;
            delete clovers[clover.id];

            set(
                state => ({
                    repro: {
                        ...state.repro,
                        clovers,
                    },
                    lanes: {
                        ...state.lanes,
                        [laneType]: {
                            ...state.lanes[laneType],
                            clovers: {
                                ...state.lanes[laneType].clovers,
                                [clover.id]: {
                                    ...clover,
                                    job: lanes[laneType].job,
                                },
                            },
                        },
                    },
                }),
                false,
                // @ts-expect-error typing
                "Action - Assign"
            );

            // Immediately forward game state.
            get().coins.tick();

            return true;
        },
    },
});

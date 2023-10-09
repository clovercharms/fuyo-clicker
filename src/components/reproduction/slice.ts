import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { Job } from "../clover/data";
import {
    CLOVER_RATE_BASE,
    HERO_CLOVER_RATE_MS,
    calculatePrice,
    upgrades,
} from "./data";
import { LaneType, lanes } from "../lanes/lane/data";
import { CloverType } from "../lanes/slice";
import { resetters } from "../../resetters";
import { produce } from "immer";

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
            heroes: {
                progress: number;
                rateMs: number;
                spawned?: {
                    id: number;
                    job: Job;
                };
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

const initialReproState = {
    clovers: {
        amount: 0,
        rateMs: 0,
        tier: 0,
        heroes: {
            progress: 0,
            rateMs: 0,
            spawned: undefined,
        },
        lastCloverId: -1,
    },
    lastUpdate: performance.now(),
};

export const createReproSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({ repro: { ...get().repro, ...initialReproState } }));
    return {
        repro: {
            ...initialReproState,
            tick: () => {
                const elapsed = Math.max(
                    0,
                    performance.now() - get().repro.lastUpdate
                );

                const cloverRateMs =
                    get().repro.clovers.tier === 0
                        ? 0
                        : upgrades.rate *
                          CLOVER_RATE_BASE ** get().repro.clovers.tier;

                // Hero Clovers
                const heroCloverLaneTypes = determineHeroCloverLaneTypes(get);
                const shouldSpawnHeroClover =
                    get().repro.clovers.heroes.spawned === undefined &&
                    heroCloverLaneTypes.length > 0;
                const heroCloverRateMs = !shouldSpawnHeroClover
                    ? 0
                    : HERO_CLOVER_RATE_MS;

                set(
                    produce<GameState>(state => {
                        const clovers = state.repro.clovers;
                        const heroes = state.repro.clovers.heroes;

                        state.repro.lastUpdate = performance.now();
                        clovers.rateMs = cloverRateMs;
                        clovers.amount += elapsed * cloverRateMs;

                        heroes.rateMs = heroCloverRateMs;
                        heroes.progress += elapsed * heroCloverRateMs;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Repro"
                );

                // Hero Clovers
                if (
                    !shouldSpawnHeroClover ||
                    get().repro.clovers.heroes.progress < 1
                )
                    return;

                // Generate new Hero Clover
                const heroClover = generateHeroClover(
                    get().repro.clovers.lastCloverId,
                    heroCloverLaneTypes
                );

                set(
                    produce<GameState>(state => {
                        const clovers = state.repro.clovers;
                        const heroes = state.repro.clovers.heroes;

                        heroes.progress = 0;
                        heroes.spawned = heroClover;
                        clovers.lastCloverId = heroClover.id;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Repro - Hero Clover"
                );
            },
            spawn: () => {
                // Generate new Hero Clover
                const heroCloverLaneTypes = determineHeroCloverLaneTypes(get);
                if (heroCloverLaneTypes.length === 0) {
                    alert("Conditions not met to spawn hero clover.");
                    return;
                }
                const heroClover = generateHeroClover(
                    get().repro.clovers.lastCloverId,
                    heroCloverLaneTypes
                );

                set(
                    produce<GameState>(state => {
                        const clovers = state.repro.clovers;
                        const heroes = state.repro.clovers.heroes;

                        heroes.progress = 0;
                        heroes.spawned = heroClover;
                        clovers.lastCloverId = heroClover.id;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Cheat - Hero Clover"
                );
            },
            click: () => {
                get().repro.tick();

                set(
                    produce<GameState>(state => {
                        state.repro.clovers.amount += 1;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Click - Clover"
                );
            },
            upgrade: () => {
                get().tick();

                const nextTier = get().repro.clovers.tier + 1;
                const price = calculatePrice(nextTier);
                if (get().coins.amount < price) return false;

                set(
                    produce<GameState>(state => {
                        state.coins.amount -= price;
                        state.repro.clovers.tier++;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Upgrade - Repro"
                );

                get().tick();

                return true;
            },
        },
    };
};

/** Buildings required for hero clover of type to spawn. */
const HERO_CLOVER_REQUIRED_BUILDINGS = 3;

function determineHeroCloverLaneTypes(get: () => GameState) {
    return Object.entries(get().lanes.types)
        .filter(([, lane]) => lane.buildings > 0)
        .filter(
            ([, lane]) =>
                lane.clovers[CloverType.Hero].length <
                Math.floor(lane.buildings / HERO_CLOVER_REQUIRED_BUILDINGS)
        )
        .map(([type]) => type as unknown as LaneType);
}

function generateHeroClover(lastId: number, laneTypes: LaneType[]) {
    const laneType =
        laneTypes[Math.round(Math.random() * laneTypes.length - 1)];

    return {
        id: lastId + 1,
        job: lanes[laneType].job,
    };
}

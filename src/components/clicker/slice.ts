import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { produce } from "immer";
import { calcElapsed } from "@/utils/timer";

import { resetters } from "../../stores/game/resetters";

import { calcClickAmount, calcRateMs } from "./calc";

/**
 * Slice about coins, such as the total amount and actual production numbers.
 * Handles logic for chronologically updating, and manually clicking.
 */
export interface CoinsSlice {
    coins: {
        amount: number;
        manualAmount: number;
        lastUpdate: number;
        rateMs: number;
        clickers: number;
        /**
         * Chronologically updates coins state.
         */
        tick: () => void;
        /**
         * Manually increments the coin amount.
         */
        click: () => number;
        /**
         * Manually sets the amount of coins.
         */
        cheat: (amount: number) => void;
    };
}

const initialCoinsState = () => ({
    amount: 0,
    manualAmount: 0,
    lastUpdate: Date.now(),
    rateMs: 0,
    clickers: 0,
});

export const createCoinsSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        coins: { ...get().coins, ...initialCoinsState() },
    }));
    return {
        coins: {
            ...initialCoinsState(),
            tick: () => {
                const rateMs = calcRateMs(
                    get().upgrades.unlocked,
                    get().lanes.types,
                    get().coins.clickers,
                    get().boosts.types
                );

                set(
                    produce<GameState>(state => {
                        const elapsed = calcElapsed(
                            get().lastLoaded,
                            get().coins.lastUpdate
                        );

                        state.coins.lastUpdate = Date.now();
                        state.coins.rateMs = rateMs;
                        state.coins.amount += elapsed * rateMs;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Clicker"
                );
            },
            click: () => {
                // Immediately forward game state.
                get().coins.tick();

                const amount = calcClickAmount(
                    get().upgrades.unlocked,
                    get().lanes.types,
                    get().coins.clickers
                );

                set(
                    produce<GameState>(state => {
                        state.coins.amount += amount;
                        state.coins.manualAmount += amount;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Click"
                );

                return amount;
            },
            cheat: (amount: number) => {
                set(
                    produce<GameState>(state => {
                        state.coins.amount = amount;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Cheat - Coins"
                );
            },
        },
    };
};

import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { resetters } from "../../resetters";
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

const initialCoinsState = {
    amount: 0,
    manualAmount: 0,
    lastUpdate: performance.now(),
    rateMs: 0,
    clickers: 0,
};

export const createCoinsSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({ coins: { ...get().coins, ...initialCoinsState } }));
    return {
        coins: {
            ...initialCoinsState,
            tick: () => {
                const elapsed = Math.max(
                    0,
                    performance.now() - get().coins.lastUpdate
                );

                const rateMs = calcRateMs(
                    get().upgrades.unlocked,
                    get().lanes.types,
                    get().coins.clickers,
                    get().boosts.types
                );

                set(
                    state => ({
                        coins: {
                            ...state.coins,
                            lastUpdate: performance.now(),
                            rateMs,
                            amount: state.coins.amount + elapsed * rateMs,
                        },
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
                    get().coins.clickers,
                    get().boosts.types
                );

                set(
                    state => ({
                        coins: {
                            ...state.coins,
                            amount: state.coins.amount + amount,
                            manualAmount: state.coins.manualAmount + amount,
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Click"
                );

                return amount;
            },
            cheat: (amount: number) => {
                // Immediately forward game state.
                get().coins.tick();

                set(
                    state => ({
                        coins: {
                            ...state.coins,
                            amount: amount,
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Cheat - Coins"
                );
            },
        },
    };
};

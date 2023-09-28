import { StoreApi } from "zustand";
import { GameState, resetters } from "../../store";
import { LaneType, calculateLaneRate } from "../lanes/lane/data";
import { CLICKER_RATE_MS } from "./data";
import { LaneTypeUpgradeType, UpgradeType } from "../shop/upgrades/data";

/**
 * Slice about coins, such as the total amount and actual production numbers.
 * Handles logic for chronologically updating, and manually clicking.
 */
export interface CoinsSlice {
    coins: {
        amount: number;
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
        click: () => void;
        /**
         * Manually sets the amount of coins.
         */
        cheat: (amount: number) => void;
    };
}

const initialCoinsState = {
    amount: 0,
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

                // Start rate calculation
                let rateMs = 0;

                // Upgrades
                const upgrades = Object.entries(get().upgrades.unlocked).reduce(
                    (prev, [type, unlocked]) => ({
                        ...prev,
                        [type as unknown as UpgradeType]:
                            Object.keys(unlocked).length,
                    }),
                    {} as Record<UpgradeType, number>
                );

                // Clickers
                rateMs +=
                    get().coins.clickers *
                    CLICKER_RATE_MS *
                    2 ** upgrades[UpgradeType.Clicker];

                // Lanes
                for (const type of Object.values(LaneType).filter(
                    t => typeof t === "number"
                )) {
                    const lane = get().lanes.rows[type as LaneType];
                    rateMs += calculateLaneRate(
                        type as LaneType,
                        lane.buildings,
                        upgrades[LaneTypeUpgradeType[type as LaneType]!],
                        Object.keys(lane.clovers.heros).length
                    );
                }

                set(
                    state => ({
                        coins: {
                            ...state.coins,
                            lastUpdate: performance.now(),
                            rateMs,
                            amount:
                                state.coins.amount +
                                elapsed * state.coins.rateMs,
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

                set(
                    state => ({
                        coins: {
                            ...state.coins,
                            amount:
                                state.coins.amount +
                                1 *
                                    2 **
                                        Object.keys(
                                            state.upgrades.unlocked[
                                                UpgradeType.Clicker
                                            ]
                                        ).length,
                        },
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Click"
                );
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

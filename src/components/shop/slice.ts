import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { calculatePrice, isItemUnlocked, items } from "./data";
import { CLOVERS_PER_BUILDING } from "../lanes/lane/data";
import { resetters } from "../../stores/game/resetters";
import { produce } from "immer";
import { CloverType } from "../clover/data";

/**
 * State about an item in the shop.
 */
export interface Item {
    purchased: number;
}

/**
 * Slice containing shop specific state.
 */
export interface ShopSlice {
    shop: {
        items: Record<number, Item>;
        unlocked: Record<number, boolean>;
        /**
         * Action for buying an item from the store.
         * @param id The metadata id of the item to purchase.
         * @returns Whether or not the purchase was successful.
         */
        buy: (id: number) => boolean;
        /**
         * Chronologically updates shop state.
         */
        tick: () => void;
    };
}

const initialItemState = { purchased: 0 };
const initialShopState = {
    items: Object.keys(items).map(() => structuredClone(initialItemState)),
    unlocked: {},
};

export const createShopSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({ shop: { ...get().shop, ...initialShopState } }));
    return {
        shop: {
            ...initialShopState,
            buy: (id: number) => {
                const item =
                    get().shop.items[id] ?? structuredClone(initialItemState);
                const price = calculatePrice(id, item.purchased);
                const laneType = items[id].laneType;

                // Auto clicker
                if (laneType === undefined) {
                    if (get().coins.amount < price) return false;

                    set(
                        produce<GameState>(state => {
                            state.coins.amount -= price;
                            state.coins.clickers++;
                            state.shop.items[id] = {
                                ...item,
                                purchased: item.purchased + 1,
                            };
                        }),
                        false,
                        // @ts-expect-error typing
                        "Action - Buy - Auto Clicker"
                    );
                } else {
                    if (get().repro.clovers.amount < price) return false;

                    set(
                        produce<GameState>(state => {
                            const repro = state.repro;
                            repro.clovers.amount -= price;
                            repro.clovers.lastCloverId += CLOVERS_PER_BUILDING;

                            state.shop.items[id] = {
                                ...item,
                                purchased: item.purchased + 1,
                            };

                            const lane = state.lanes.types[laneType];
                            lane.buildings++;
                            lane.clovers[CloverType.Regular].push(
                                ...new Array(CLOVERS_PER_BUILDING)
                                    .fill(undefined)
                                    .map(
                                        (_, i) =>
                                            state.repro.clovers.lastCloverId +
                                            (i + 1)
                                    )
                            );
                        }),
                        false,
                        // @ts-expect-error typing
                        "Action - Buy - Building"
                    );
                }

                get().tick();

                return true;
            },
            tick: () => {
                let unlocked = {};
                let newUnlocked = false;

                for (const id of Object.keys(items).map(Number)) {
                    const shopItem =
                        get().shop.items[id] ??
                        structuredClone(initialItemState);

                    if (!get().shop.unlocked[id]) {
                        if (
                            !isItemUnlocked(
                                shopItem,
                                items[id as unknown as number],
                                get().coins.amount,
                                get().repro.clovers.amount
                            )
                        )
                            continue;
                        else newUnlocked = true;
                    }
                    unlocked = {
                        ...unlocked,
                        [id]: true,
                    };
                }
                if (!newUnlocked) return;

                set(
                    produce<GameState>(state => {
                        state.shop.unlocked = {
                            ...state.shop.unlocked,
                            ...unlocked,
                        };
                    }),
                    false,
                    // @ts-expect-error typing
                    "Tick - Shop - Unlock"
                );
            },
        },
    };
};

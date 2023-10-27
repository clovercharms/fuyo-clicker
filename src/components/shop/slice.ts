import { StoreApi } from "zustand";
import { GameState } from "@/store";
import { calculatePrice, isItemUnlocked, items } from "./item/data";
import { CLOVERS_PER_BUILDING } from "../lanes/lane/data";
import { CloverType } from "../lanes/slice";
import { resetters } from "../../resetters";
import { produce } from "immer";

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
         * Getter for filtering items based on whether or not they have
         * previously been unlocked.
         * @returns Unlocked items.
         */
        unlockedItems: () => Record<number, Item>;
        /**
         * Action for buying an item from the store.
         * @param id The metadata id of the item to purchase.
         * @returns Whether or not the purchase was successful.
         */
        buy: (id: number) => boolean;
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
            unlockedItems: () => {
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
                        [id]: shopItem,
                    };
                }

                if (newUnlocked) {
                    set(
                        produce<GameState>(state => {
                            state.shop.unlocked = {
                                ...state.shop.unlocked,
                                ...unlocked,
                            };
                        }),
                        false,
                        // @ts-expect-error typing
                        "Shop - Unlocked - Item"
                    );
                }
                return unlocked;
            },
            buy: (id: number) => {
                const item = get().shop.items[id];
                const price = calculatePrice(id, item.purchased);
                const laneType = items[id].laneType;

                get().tick();

                // Auto clicker
                if (laneType === undefined) {
                    if (get().coins.amount < price) return false;

                    set(
                        produce<GameState>(state => {
                            state.coins.amount -= price;
                            state.coins.clickers++;
                            state.shop.items[id].purchased++;
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

                            state.shop.items[id].purchased++;

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
        },
    };
};

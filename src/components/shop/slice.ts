import { StoreApi } from "zustand";
import { GameState, resetters } from "../../store";
import { calculatePrice, isItemUnlocked, items } from "./item/data";
import { generateClover } from "../reproduction/slice";
import { Clover } from "../clover/slice";
import { lanes } from "../lanes/lane/data";
import { items as itemsData } from "./item/data";

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

const initialShopState = {
    items: Object.keys(items).map(() => ({ purchased: 0 })),
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

                for (const [id, item] of Object.entries(get().shop.items)) {
                    if (!get().shop.unlocked[id as unknown as number]) {
                        if (
                            !isItemUnlocked(
                                item,
                                itemsData[id as unknown as number],
                                get().coins.amount,
                                get().repro.clovers.amount
                            )
                        )
                            continue;
                        else newUnlocked = true;
                    }
                    unlocked = {
                        ...unlocked,
                        [id]: item,
                    };
                }

                if (newUnlocked) {
                    set(
                        state => ({
                            ...state,
                            shop: {
                                ...state.shop,
                                unlocked,
                            },
                        }),
                        false,
                        // @ts-expect-error typing
                        "Shop - Update Unlocked"
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
                        state => ({
                            coins: {
                                ...state.coins,
                                amount: state.coins.amount - price,
                                clickers: state.coins.clickers + 1,
                            },
                            shop: {
                                ...state.shop,
                                items: {
                                    ...state.shop.items,
                                    [id]: {
                                        ...state.shop.items[id],
                                        purchased:
                                            state.shop.items[id].purchased + 1,
                                    },
                                },
                            },
                        }),
                        false,
                        // @ts-expect-error typing
                        "Action - Purchase - Auto Clicker"
                    );
                } else {
                    if (get().repro.clovers.amount < price) return false;

                    const time = Date.now();
                    const clovers = new Array(items[id].clovers)
                        .fill(undefined)
                        .reduce((prev: Record<number, Clover>, _, i) => {
                            const clover = {
                                ...generateClover(
                                    get().repro.clovers.lastCloverId + i
                                ),
                                job: lanes[laneType].job,
                                assigned: time - items[id].clovers! + i,
                            };
                            prev[clover.id] = clover;
                            return prev;
                        }, {});

                    set(
                        state => ({
                            repro: {
                                ...state.repro,
                                clovers: {
                                    ...state.repro.clovers,
                                    amount: state.repro.clovers.amount - price,
                                    lastCloverId:
                                        state.repro.clovers.lastCloverId +
                                        Object.keys(clovers).length,
                                },
                            },
                            shop: {
                                ...state.shop,
                                items: {
                                    ...state.shop.items,
                                    [id]: {
                                        ...state.shop.items[id],
                                        purchased:
                                            state.shop.items[id].purchased + 1,
                                    },
                                },
                            },
                            lanes: {
                                ...state.lanes,
                                rows: {
                                    ...state.lanes.rows,
                                    [laneType]: {
                                        ...state.lanes.rows[laneType],
                                        buildings:
                                            state.lanes.rows[laneType]
                                                .buildings + 1,
                                        clovers: {
                                            ...state.lanes.rows[laneType]
                                                .clovers,
                                            regular: {
                                                ...state.lanes.rows[laneType]
                                                    .clovers.regular,
                                                ...clovers,
                                            },
                                        },
                                    },
                                },
                            },
                        }),
                        false,
                        // @ts-expect-error typing
                        "Action - Purchase - Building"
                    );
                }

                get().tick();

                return true;
            },
        },
    };
};

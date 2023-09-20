import { StoreApi } from "zustand";
import { GameState } from "../../store";
import { calculatePrice, data } from "./data";

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
        /**
         * Action for buying an item from the store.
         * @param id The metadata id of the item to purchase.
         * @returns Whether or not the purchase was successful.
         */
        buy: (id: number) => boolean;
    };
}

export const createShopSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => ({
    shop: {
        items: Object.keys(data).map(() => ({ purchased: 0 })),
        buy: (id: number) => {
            const item = get().shop.items[id];
            const price = calculatePrice(id, item.purchased);
            const laneType = data[id].laneType;

            // Immediately forward game state.
            const coins = get().coins.tick();
            console.log(
                "price",
                price,
                "coins",
                get().coins.amount,
                "tick coins",
                coins
            );

            if (price > get().coins.amount) return false;

            set(state => ({
                coins: {
                    ...state.coins,
                    amount: state.coins.amount - price,
                    /* If lane type not set, assume auto clicker. */
                    clickers:
                        state.coins.clickers + (laneType === undefined ? 1 : 0),
                },
                shop: {
                    ...state.shop,
                    items: {
                        ...state.shop.items,
                        [id]: {
                            ...state.shop.items[id],
                            purchased: state.shop.items[id].purchased + 1,
                        },
                    },
                },
                /* Update lane buildings if part of item. */
                ...(laneType !== undefined
                    ? {
                          lanes: {
                              ...state.lanes,
                              [laneType]: {
                                  ...state.lanes[laneType],
                                  buildings:
                                      state.lanes[laneType].buildings + 1,
                              },
                          },
                      }
                    : {}),
            }));

            get().coins.tick();

            return true;
        },
    },
});

import { StoreApi } from "zustand";
import { GameState, resetters } from "../../../store";
import { UpgradeType, upgrades } from "./data";

/**
 * Slice containing shop specific state.
 */
export interface UpgradesSlice {
    upgrades: {
        unlocked: Record<UpgradeType, Record<number, boolean>>;
        /**
         * Action for buying an upgrade from the shop.
         * @param type The type of upgrade.
         * @param id The id of the upgrade to buy.
         * @returns Whether or not the purchase was successful.
         */
        buy: (type: UpgradeType, id: number) => boolean;
    };
}

const initialUpgradesState = {
    unlocked: {
        [UpgradeType.Clicker]: {},
        [UpgradeType.Mine]: {},
    },
};

export const createUpgradesSlice = (
    set: StoreApi<GameState>["setState"],
    get: StoreApi<GameState>["getState"]
) => {
    resetters.push(() => ({
        upgrades: { ...get().upgrades, ...initialUpgradesState },
    }));
    return {
        upgrades: {
            ...initialUpgradesState,
            buy: (type: UpgradeType, id: number) => {
                get().tick();

                const price = upgrades[type][id].price;
                if (get().coins.amount < price) return false;

                set(state => ({
                    coins: {
                        ...state.coins,
                        amount: state.coins.amount - price,
                    },
                    upgrades: {
                        ...state.upgrades,
                        unlocked: {
                            ...state.upgrades.unlocked,
                            [type]: {
                                ...state.upgrades.unlocked[type],
                                [id]: true,
                            },
                        },
                    },
                }));

                get().tick();

                return true;
            },
        },
    };
};

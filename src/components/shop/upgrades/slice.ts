import { StoreApi } from "zustand";
import { GameState } from "../../../store";
import { UpgradeType, upgrades } from "./data";
import { resetters } from "../../../resetters";
import { produce } from "immer";

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
    unlocked: Object.fromEntries(
        Object.values(UpgradeType)
            .filter(t => typeof t === "number")
            .map(type => [type, {}])
    ) as Record<UpgradeType, Record<number, boolean>>,
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

                set(
                    produce<GameState>(state => {
                        state.coins.amount -= price;
                        state.upgrades.unlocked[type][id] = true;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Buy - Upgrade"
                );

                get().tick();

                return true;
            },
        },
    };
};

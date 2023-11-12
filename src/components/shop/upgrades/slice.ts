import { StoreApi } from "zustand";
import { GameState } from "@/stores/game";
import { Upgrade, UpgradeType, upgrades } from "./data";
import { resetters } from "../../../stores/game/resetters";
import { produce } from "immer";

/**
 * Slice containing shop specific state.
 */
export interface UpgradesSlice {
    upgrades: {
        unlocked: Record<UpgradeType, Record<number, boolean>>;
        /**
         * Returns the active (condition met and not purchased) upgrades.
         */
        active: () => Record<UpgradeType, Record<number, Upgrade>>;
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
            active: () =>
                Object.keys(upgrades).reduce(
                    (prev, type: unknown) => ({
                        ...prev,
                        [type as UpgradeType]: Object.entries(
                            upgrades[type as UpgradeType]
                        ).reduce(
                            (prev, [id, upgrade]) => ({
                                ...prev,
                                ...(upgrade.condition(get()) &&
                                !get().upgrades.unlocked[type as UpgradeType][
                                    parseInt(id)
                                ]
                                    ? {
                                          [id]: upgrade,
                                      }
                                    : {}),
                            }),
                            {} as Record<number, Upgrade>
                        ),
                    }),
                    {} as Record<UpgradeType, Record<number, Upgrade>>
                ),
            buy: (type: UpgradeType, id: number) => {
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

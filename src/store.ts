import { create } from "zustand";
import { CoinsSlice, createCoinsSlice } from "./components/clicker/slice";
import { ShopSlice, createShopSlice } from "./components/shop/slice";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { ReproSlice, createReproSlice } from "./components/reproduction/slice";
import { all as merge } from "deepmerge";
import { LanesSlice, createLanesSlice } from "./components/lanes/slice";
import {
    UpgradesSlice,
    createUpgradesSlice,
} from "./components/shop/upgrades/slice";
import {
    BoostsSlice,
    createBoostsSlice,
} from "./components/clicker/boosts/slice";
import { resetters } from "./resetters";
import { SpeciesSlice, createSpeciesSlice } from "./components/species/slice";

/** Combination of all different slices from different aspects of the game. */
export type GameState = CoinsSlice &
    BoostsSlice &
    UpgradesSlice &
    ShopSlice &
    ReproSlice &
    LanesSlice &
    SpeciesSlice & {
        tick: () => void;
        reset: () => void;
    };

export const STORE_NAME = "game-store";

/**
 * The main game store, contains all store as pertaining to different aspects
 * of the game.
 */
export const useGameStore = create<GameState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createCoinsSlice(set, get),
                ...createBoostsSlice(set, get),
                ...createUpgradesSlice(set, get),
                ...createShopSlice(set, get),
                ...createReproSlice(set, get),
                ...createLanesSlice(set, get),
                ...createSpeciesSlice(set, get),
                tick: () => {
                    createCoinsSlice(set, get).coins.tick();
                    createBoostsSlice(set, get).boosts.tick();
                    createReproSlice(set, get).repro.tick();
                    createSpeciesSlice(set, get).species.tick();
                },
                reset: () =>
                    set(
                        resetters.reduce(
                            (prev, curr) => ({
                                ...prev,
                                ...curr(),
                            }),
                            {}
                        ),
                        false,
                        "Action - Reset"
                    ),
            }),
            {
                name: STORE_NAME,
                version: 2,
                storage: createJSONStorage(() => localStorage),
                merge: (persisted, current) =>
                    merge([current, persisted as Partial<GameState>], {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                        arrayMerge: (_, src) => src,
                    }) as GameState,
            }
        )
    )
);

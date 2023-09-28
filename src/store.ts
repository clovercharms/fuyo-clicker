import { create } from "zustand";
import { CoinsSlice, createCoinsSlice } from "./components/clicker/slice";
import { ShopSlice, createShopSlice } from "./components/shop/slice";
import {
    createJSONStorage,
    devtools /* persist, createJSONStorage */,
    persist,
} from "zustand/middleware";
import { ReproSlice, createReproSlice } from "./components/reproduction/slice";
import { all as merge } from "deepmerge";
import { LanesSlice, createLanesSlice } from "./components/lanes/slice";
import { CloverSlice, createCloverSlice } from "./components/clover/slice";
import {
    UpgradesSlice,
    createUpgradesSlice,
} from "./components/shop/upgrades/slice";

/** Combination of all different slices from different aspects of the game. */
export type GameState = CoinsSlice &
    UpgradesSlice &
    ShopSlice &
    ReproSlice &
    CloverSlice &
    LanesSlice & {
        tick: () => void;
        reset: () => void;
    };

export const resetters: (() => Partial<GameState>)[] = [];

/**
 * The main game store, contains all store as pertaining to different aspects
 * of the game.
 */
export const useGameStore = create<GameState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createCoinsSlice(set, get),
                ...createUpgradesSlice(set, get),
                ...createShopSlice(set, get),
                ...createReproSlice(set, get),
                ...createCloverSlice(set, get),
                ...createLanesSlice(set, get),
                tick: () => {
                    createCoinsSlice(set, get).coins.tick();
                    createReproSlice(set, get).repro.tick();
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
                name: "game-store",
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

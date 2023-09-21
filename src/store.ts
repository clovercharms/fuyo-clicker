import { create } from "zustand";
import { CoinsSlice, createCoinsSlice } from "./components/clicker/slice";
import { ShopSlice, createShopSlice } from "./components/shop/slice";
import { devtools /* persist, createJSONStorage */ } from "zustand/middleware";
import { ReproSlice, createReproSlice } from "./components/reproduction/slice";
// import { all as merge } from "deepmerge";
import { LanesSlice, createLanesSlice } from "./components/lanes/slice";
import { CloverSlice, createCloverSlice } from "./components/clover/slice";

/** Combination of all different slices from different aspects of the game. */
export type GameState = CoinsSlice &
    ShopSlice &
    ReproSlice &
    CloverSlice &
    LanesSlice & {
        tick: () => void;
    };

/**
 * The main game store, contains all store as pertaining to different aspects
 * of the game.
 */
export const useGameStore = create<GameState>()(
    devtools(
        // persist(
        (set, get) => ({
            ...createCoinsSlice(set, get),
            ...createShopSlice(set, get),
            ...createReproSlice(set, get),
            ...createCloverSlice(set),
            ...createLanesSlice(set, get),
            tick: () => {
                createCoinsSlice(set, get).coins.tick();
                createReproSlice(set, get).repro.tick();
            },
        })
        // ,
        // {
        //     name: "game-store",
        //     storage: createJSONStorage(() => localStorage),
        //     merge: (persisted, current) =>
        //         merge([current, persisted as Partial<GameState>], {
        //             // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        //             arrayMerge: (_, src) => src,
        //         }) as GameState,
        // }
        // )
    )
);

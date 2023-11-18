import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { produce } from "immer";
import { PopupsSlice, createPopupsSlice } from "@/components/popups/slice";

import { CoinsSlice, createCoinsSlice } from "../../components/clicker/slice";
import { ShopSlice, createShopSlice } from "../../components/shop/slice";
import {
    ReproSlice,
    createReproSlice,
} from "../../components/reproduction/slice";
import { LanesSlice, createLanesSlice } from "../../components/lanes/slice";
import {
    UpgradesSlice,
    createUpgradesSlice,
} from "../../components/shop/upgrades/slice";
import {
    BoostsSlice,
    createBoostsSlice,
} from "../../components/clicker/boosts/slice";
import {
    SpeciesSlice,
    createSpeciesSlice,
} from "../../components/species/slice";
import { mergePersisted } from "..";

import { resetters } from "./resetters";

export enum State {
    RUNNING,
    PAUSED,
}

export interface GameSlice {
    tick: () => void;
    reset: () => void;
    state: State;
    setState: (state: State) => void;
    load: (state: GameState) => void;
    lastLoaded: number;
}

/** Combination of all different slices from different aspects of the game. */
export type GameState = GameSlice &
    CoinsSlice &
    BoostsSlice &
    UpgradesSlice &
    ShopSlice &
    ReproSlice &
    LanesSlice &
    SpeciesSlice &
    PopupsSlice;

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
                ...createPopupsSlice(set, get),
                tick: () => {
                    createCoinsSlice(set, get).coins.tick();
                    createBoostsSlice(set, get).boosts.tick();
                    createReproSlice(set, get).repro.tick();
                    createSpeciesSlice(set, get).species.tick();
                    createShopSlice(set, get).shop.tick();
                    createPopupsSlice(set, get).popups.tick();
                },
                reset: () =>
                    set(
                        {
                            ...resetters.reduce(
                                (prev, curr) => ({
                                    ...prev,
                                    ...curr(),
                                }),
                                {}
                            ),
                            lastLoaded: Date.now(),
                        },
                        false,
                        "Action - Reset"
                    ),
                state: State.RUNNING,
                setState: (state: State) =>
                    set(
                        produce<GameState>(game => {
                            game.state = state;
                        }),
                        false,
                        "Action - State"
                    ),
                load: (state: GameState) =>
                    set(
                        {
                            ...mergePersisted<GameState>()(
                                state,
                                resetters.reduce(
                                    (prev, curr) => ({
                                        ...prev,
                                        ...curr(),
                                    }),
                                    {} as GameState
                                )
                            ),
                            lastLoaded: Date.now(),
                        },
                        false,
                        "Action - Load"
                    ),
                lastLoaded: Date.now(),
            }),
            {
                name: STORE_NAME,
                version: 3,
                storage: createJSONStorage(() => localStorage),
                merge: (persisted, current) => ({
                    ...mergePersisted<GameState>()(persisted, current),
                    lastLoaded: Date.now(),
                }),
                migrate: (persistedState, version) => {
                    switch (version) {
                        case 2:
                            return {
                                ...(persistedState as GameState),
                                state: State.RUNNING,
                            };
                        default:
                            return persistedState as GameState;
                    }
                },
            }
        )
    )
);

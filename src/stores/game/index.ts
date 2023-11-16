import { create } from "zustand";
import { CoinsSlice, createCoinsSlice } from "../../components/clicker/slice";
import { ShopSlice, createShopSlice } from "../../components/shop/slice";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
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
import { resetters } from "./resetters";
import {
    SpeciesSlice,
    createSpeciesSlice,
} from "../../components/species/slice";
import { mergePersisted } from "..";
import { produce } from "immer";

export enum State {
    RUNNING,
    PAUSED,
}

export interface GameSlice {
    state: State;
    tick: () => void;
    reset: () => void;
    setState: (state: State) => void;
    load: (state: GameState) => void;
}

/** Combination of all different slices from different aspects of the game. */
export type GameState = GameSlice &
    CoinsSlice &
    BoostsSlice &
    UpgradesSlice &
    ShopSlice &
    ReproSlice &
    LanesSlice &
    SpeciesSlice;

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
                state: State.RUNNING,
                tick: () => {
                    createCoinsSlice(set, get).coins.tick();
                    createBoostsSlice(set, get).boosts.tick();
                    createReproSlice(set, get).repro.tick();
                    createSpeciesSlice(set, get).species.tick();
                    createShopSlice(set, get).shop.tick();
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
                        mergePersisted<GameState>()(state, get()),
                        true,
                        "Action - Load"
                    ),
            }),
            {
                name: STORE_NAME,
                version: 3,
                storage: createJSONStorage(() => localStorage),
                merge: mergePersisted<GameState>(),
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

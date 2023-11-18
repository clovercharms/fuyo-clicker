import { AudioSlice, createAudioSlice } from "@/utils/audio";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import {
    Quality,
    SettingsSlice,
    createSettingsSlice,
} from "@/components/news/settings/slice";

import { mergePersisted } from "..";

export type SettingsState = SettingsSlice & AudioSlice;

export const STORE_NAME = "settings-store";

/**
 * The main game store, contains all store as pertaining to different aspects
 * of the game.
 */
export const useSettingsStore = create<SettingsState>()(
    devtools(
        persist(
            (set, get) => ({
                ...createAudioSlice(set, get),
                ...createSettingsSlice(set),
            }),
            {
                name: STORE_NAME,
                version: 2,
                storage: createJSONStorage(() => localStorage),
                merge: mergePersisted<SettingsState>(),
                migrate: (persistedState, version) => {
                    switch (version) {
                        case 0:
                            return {
                                ...(persistedState as SettingsState),
                                debug: false,
                            };
                        case 1:
                            return {
                                ...(persistedState as SettingsState),
                                quality: Quality.High,
                            };
                        default:
                            return persistedState as SettingsState;
                    }
                },
            }
        )
    )
);

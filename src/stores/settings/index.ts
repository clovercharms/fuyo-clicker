import { AudioSlice, createAudioSlice } from "@/utils/audio";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { mergePersisted } from "..";

export type SettingsState = AudioSlice & {
    debug: boolean;
};

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
                debug: false,
            }),
            {
                name: STORE_NAME,
                version: 1,
                storage: createJSONStorage(() => localStorage),
                merge: mergePersisted<SettingsState>(),
            }
        )
    )
);

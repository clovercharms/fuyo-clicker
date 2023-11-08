import { AudioSlice, createAudioSlice } from "@/utils/audio";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { mergePersisted } from "..";

export type SettingsState = AudioSlice;

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
            }),
            {
                name: STORE_NAME,
                version: 0,
                storage: createJSONStorage(() => localStorage),
                merge: mergePersisted<SettingsState>(),
            }
        )
    )
);

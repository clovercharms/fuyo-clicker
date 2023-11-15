import { AudioSlice, createAudioSlice } from "@/utils/audio";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { mergePersisted } from "..";
import { produce } from "immer";

export type SettingsState = AudioSlice & {
    debug: boolean;
    setDebug: (value: boolean) => void;
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
                setDebug: (value: boolean) => {
                    set(
                        produce<SettingsState>(state => {
                            state.debug = value;
                        }),
                        false,
                        "Action - Settings - Debug"
                    );
                },
            }),
            {
                name: STORE_NAME,
                version: 1,
                storage: createJSONStorage(() => localStorage),
                merge: mergePersisted<SettingsState>(),
                migrate: (persistedState, version) => {
                    switch (version) {
                        case 0:
                            return {
                                ...(persistedState as SettingsState),
                                debug: false,
                            };
                        default:
                            return persistedState as SettingsState;
                    }
                },
            }
        )
    )
);

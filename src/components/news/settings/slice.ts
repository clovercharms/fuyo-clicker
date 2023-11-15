import { StoreApi } from "zustand";
import { produce } from "immer";
import { SettingsState } from "@/stores/settings";

export enum Quality {
    High,
    Medium,
    Low,
}

/**
 * Slice of the state of species in the game.
 */
export interface SettingsSlice {
    debug: boolean;
    setDebug: (value: boolean) => void;
    quality: Quality;
    setQuality: (value: Quality) => void;
}

/**
 * Default settings state.
 */
const defaultSettings = {
    debug: false,
    quality: Quality.High,
};

export const createSettingsSlice = (
    set: StoreApi<SettingsState>["setState"]
) => {
    return {
        ...defaultSettings,
        setDebug: (value: boolean) => {
            set(
                produce<SettingsState>(state => {
                    state.debug = value;
                }),
                false,
                // @ts-expect-error typing
                "Action - Settings - Debug"
            );
        },
        setQuality: (value: Quality) => {
            set(
                produce<SettingsState>(state => {
                    state.quality = value;
                }),
                false,
                // @ts-expect-error typing
                "Action - Settings - Quality"
            );
        },
    };
};

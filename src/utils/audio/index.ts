import { StoreApi } from "zustand";
import { SOUNDS, Sound, SoundType } from "./sounds";
import { SettingsState } from "@/stores/settings";
import { produce } from "immer";

/**
 * The options for initializing a new `HTMLAudioElement`.
 */
export interface AudioInitOptions {
    /** The volume to apply. */
    volume?: number;
    /** Whether or not the audio should loop. */
    loop?: boolean;
}

/**
 * The AudioSlice holds all audio related state, and controls playback
 * behavior across all sounds.
 */
export interface AudioSlice {
    audio: {
        /**
         * Plays a given sound.
         * @param sound The sound to play.
         */
        play: (sound: Sound, options?: AudioInitOptions) => Promise<void>;
        /**
         * Set mute state on a given sound type.
         * @param type The type of sound to mute.
         * @param muted The mute state.
         */
        mute: (type: SoundType, muted: boolean) => Promise<void>;
        /**
         * Contains muted states of sound types.
         */
        muted: Record<SoundType, boolean>;
    };
}

/**
 * Default audio state.
 */
const defaultAudio = {
    muted: {
        [SoundType.Music]: false,
        [SoundType.SFX]: false,
    },
};

/**
 * Initializes a new `HTMLAudioElement` with given options.
 * @param src The source of the audio file to use as a source.
 * @param options The options for how the element should be configured.
 * @returns A reference to the generated `HTMLAudioElement`.
 */
const initializeAudio = (src: string, options?: AudioInitOptions) => {
    const audio = new Audio(src);
    audio.volume = options?.volume ?? 1.0;
    audio.loop = options?.loop ?? false;

    return audio;
};

/**
 * Collection of active audio elements.
 */
export const elements: Partial<Record<Sound, HTMLAudioElement[]>> = {};

export const createAudioSlice = (
    set: StoreApi<SettingsState>["setState"],
    get: StoreApi<SettingsState>["getState"]
) => {
    return {
        audio: {
            ...defaultAudio,
            play: async (sound: Sound, options?: AudioInitOptions) => {
                const config = SOUNDS[sound];
                if (get().audio.muted[SOUNDS[sound].type]) return;

                let element: HTMLAudioElement;
                if (!config.persistent || !elements[sound]?.length) {
                    element = initializeAudio(
                        config.src,
                        options ?? config.options
                    );
                    if (!config.persistent) {
                        // Remove from memory when ended
                        element.addEventListener("ended", () => {
                            elements[sound] = elements[sound]?.filter(
                                s => s === element
                            );
                        });
                    }

                    if (!elements[sound]) elements[sound] = [];
                    elements[sound]!.push(element);
                } else {
                    element = elements[sound]![0];
                }

                return element.play();
            },
            mute: async (type: SoundType, muted: boolean) => {
                set(
                    produce<SettingsState>(settings => {
                        settings.audio.muted[type] = muted;
                    }),
                    false,
                    // @ts-expect-error typing
                    "Action - Audio - Mute"
                );

                const typeSounds = Object.entries(elements).filter(
                    ([sound]) => SOUNDS[sound as unknown as Sound].type === type
                ) as unknown as [Sound, HTMLAudioElement[]][];

                const promises: Promise<void>[] = [];
                for (const [sound, elems] of typeSounds) {
                    for (const element of elems) {
                        if (!SOUNDS[sound].persistent) {
                            element.pause();
                            // Clear references
                            elements[sound] = [];
                            continue;
                        }

                        if (muted) {
                            element.pause();
                        } else {
                            promises.push(element.play());
                        }
                    }
                }

                await Promise.allSettled(promises);
            },
        },
    };
};

/* eslint-disable react-refresh/only-export-components */
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { SOUNDS, Sound } from "./sounds";

/**
 * Container of the state of a sound.
 */
export interface SoundState {
    /** Reference to the underlying audio element. */
    element?: HTMLAudioElement;
    /** Whether or not the sound is muted. */
    muted?: boolean;
}

/**
 * The AudioContext holds all audio related state, and controls playback
 * behavior across all sounds.
 */
export interface AudioContext {
    /**
     * Plays a given sound.
     * @param sound The sound to play.
     */
    play: (sound: Sound) => void;
    /**
     * Set mute state on a given sound.
     * @param sound The sound to apply to.
     * @param muted The mute state.
     */
    setMuted: (sound: Sound, muted: boolean) => void;
    /**
     * Contains playback states of sounds.
     */
    states: Partial<Record<Sound, SoundState>>;
}

const AudioContext = createContext<AudioContext>(undefined!);

/**
 * The options for initializing a new `HTMLAudioElement`.
 */
export interface AudioInitOptions {
    /** The volume to apply. */
    volume: number;
    /** Whether or not the audio should loop. */
    loop: boolean;
}

/**
 * Initializes a new `HTMLAudioElement` with given options.
 * @param src The source of the audio file to use as a source.
 * @param options The options for how the element should be configured.
 * @returns A reference to the generated `HTMLAudioElement`.
 */
const initializeAudio = (src: string, options?: Partial<AudioInitOptions>) => {
    const audio = new Audio(src);
    audio.volume = options?.volume ?? 1.0;
    audio.loop = options?.loop ?? false;

    return audio;
};

/**
 * The `AudioProvider` component provides context access to audio and playback
 * related state and behavior.
 */
export function AudioProvider({ children }: PropsWithChildren) {
    const [audioStates, setAudioStates] = useState<
        Partial<Record<Sound, SoundState>>
    >({});

    const play = (sound: Sound) => {
        const config = SOUNDS[sound];
        const state = audioStates[sound];
        if (state?.muted) return;

        let element: HTMLAudioElement;
        if (!state?.element) {
            element = initializeAudio(config.src, config.options);

            if (config.persistent) {
                setAudioStates(states => ({
                    ...states,
                    [sound]: {
                        element,
                    },
                }));
            }
        } else {
            element = state.element;
        }

        void element.play();
    };

    const setMuted = (sound: Sound, muted: boolean) => {
        const state = audioStates[sound];

        setAudioStates(states => ({
            ...states,
            [sound]: {
                ...states[sound],
                muted,
            },
        }));

        // Set playback based on mute.
        if (state?.element) {
            if (muted) {
                state?.element.pause();
            } else {
                void state?.element.play();
            }
        }
    };

    return (
        <AudioContext.Provider value={{ play, setMuted, states: audioStates }}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}

/* eslint-disable react-refresh/only-export-components */
import {
    PropsWithChildren,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";
import { SOUNDS, Sound, SoundType } from "./sounds";

/**
 * The AudioContext holds all audio related state, and controls playback
 * behavior across all sounds.
 */
export interface AudioContext {
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
    /**
     * Contains audio elements associated with sounds.
     */
    elements: Partial<Record<Sound, HTMLAudioElement[]>>;
}

const AudioContext = createContext<AudioContext>(undefined!);

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
 * The `AudioProvider` component provides context access to audio and playback
 * related state and behavior.
 */
export function AudioProvider({ children }: PropsWithChildren) {
    const elements = useRef<Partial<Record<Sound, HTMLAudioElement[]>>>({});
    const [muted, setMuted] = useState<Record<SoundType, boolean>>({
        [SoundType.Music]: false,
        [SoundType.SFX]: false,
    });

    const play = async (sound: Sound, options?: AudioInitOptions) => {
        const config = SOUNDS[sound];
        if (muted[SOUNDS[sound].type]) return;

        let element: HTMLAudioElement;
        if (!config.persistent || !elements.current[sound]?.length) {
            element = initializeAudio(config.src, options ?? config.options);
            if (!config.persistent) {
                // Remove from memory when ended
                element.addEventListener("ended", () => {
                    elements.current[sound] = elements.current[sound]?.filter(
                        s => s === element
                    );
                });
            }

            if (!elements.current[sound]) elements.current[sound] = [];
            elements.current[sound]!.push(element);
        } else {
            element = elements.current[sound]![0];
        }

        return element.play();
    };

    const mute = async (type: SoundType, muted: boolean) => {
        setMuted(m => ({
            ...m,
            [type]: muted,
        }));

        const typeSounds = Object.entries(elements.current).filter(
            ([sound]) => SOUNDS[sound as unknown as Sound].type === type
        );

        const promises: Promise<void>[] = [];
        for (const [, elements] of typeSounds) {
            for (const element of elements) {
                if (muted) {
                    element.pause();
                } else {
                    promises.push(element.play());
                }
            }
        }

        await Promise.allSettled(promises);
    };

    return (
        <AudioContext.Provider
            value={{ play, mute, muted, elements: elements.current }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    return useContext(AudioContext);
}

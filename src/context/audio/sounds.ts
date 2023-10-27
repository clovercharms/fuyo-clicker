import bgm from "@/assets/audio/fuyonade_dreams_ver2.wav";
import coin1 from "@/assets/audio/Coin_Sound_3.mp3";
import coin2 from "@/assets/audio/Coin_Sound_1-3.mp3";
import kaching from "@/assets/audio/kachingNotReally.wav";
import { AudioInitOptions } from ".";

/**
 * Different types of sounds.
 */
export enum Sound {
    BGM,
    Coin1,
    Coin2,
    Kaching,
}

/**
 * Configuration options for a `Sound`.
 */
export interface SoundConfig {
    /** The source of the audio file. */
    src: string;
    /** Whether or not audio should persist and be controllable. */
    persistent?: boolean;
    /** The options to use when initializing the `HTMLAudioElement` element. */
    options?: Partial<AudioInitOptions>;
}

/**
 * Predefined lists of configured sounds and their configuration.
 */
export const SOUNDS: Record<Sound, SoundConfig> = {
    [Sound.BGM]: {
        src: bgm,
        persistent: true,
        options: {
            loop: true,
        },
    },
    [Sound.Coin1]: { src: coin1 },
    [Sound.Coin2]: { src: coin2 },
    [Sound.Kaching]: { src: kaching, options: { volume: 0.4 } },
};

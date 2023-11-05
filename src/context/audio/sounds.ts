import bgm from "@/assets/audio/fuyonade_dreams_ver2.wav";
import coin1 from "@/assets/audio/Coin_Sound_3.mp3";
import coin2 from "@/assets/audio/Coin_Sound_1-3.mp3";
import kaching from "@/assets/audio/kachingNotReally.wav";
import smooch1 from "@/assets/audio/Smooch_2.mp3";
import smooch2 from "@/assets/audio/Smooch_3.mp3";
import smooch3 from "@/assets/audio/Smooch_4-2.mp3";
import smooch4 from "@/assets/audio/Smooch_4-4.mp3";
import smooch5 from "@/assets/audio/Smooch_4.mp3";
import { AudioInitOptions } from ".";

/**
 * Different types of sounds.
 */
export enum Sound {
    BGM,
    Coin1,
    Coin2,
    Kaching,
    Smooch1,
    Smooch2,
    Smooch3,
    Smooch4,
    Smooch5,
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
    [Sound.Coin1]: { src: coin1, options: { volume: 0.25 } },
    [Sound.Coin2]: { src: coin2, options: { volume: 0.25 } },
    [Sound.Kaching]: { src: kaching, options: { volume: 0.25 } },
    [Sound.Smooch1]: { src: smooch1, options: { volume: 0.1 } },
    [Sound.Smooch2]: { src: smooch2, options: { volume: 0.1 } },
    [Sound.Smooch3]: { src: smooch3, options: { volume: 0.1 } },
    [Sound.Smooch4]: { src: smooch4, options: { volume: 0.1 } },
    [Sound.Smooch5]: { src: smooch5, options: { volume: 0.1 } },
};

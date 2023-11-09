import bgm from "@/assets/audio/fuyonade_dreams_ver2.wav";
import * as clicker from "@/assets/audio/clicker";
import kaching from "@/assets/audio/kachingNotReally.wav";
import * as repro from "@/assets/audio/repro";
import * as lanes from "@/assets/audio/lanes";
import * as species from "@/assets/audio/species";
import { AudioInitOptions } from ".";

/**
 * Different types of sounds.
 */
export enum Sound {
    BGM,
    Coin1,
    Coin2,
    FuyonadeFull,
    Kaching,
    Smooch1,
    Smooch2,
    Smooch3,
    Smooch4,
    Smooch5,
    Smooch6,
    Alien1,
    Astronaut1,
    AutoClicker1,
    Blacksmith1,
    Cultist1,
    Diver1,
    Diver2,
    Engineer1,
    Generico1,
    Hazmat1,
    Investor1,
    Knight1,
    Lumberjack1,
    Mechanic1,
    Miner1,
    Peak1,
    Scientist1,
    Wizard1,
    Ahh1,
    Ahh2,
    Ahh3,
    Ahh4,
    Ahh5,
    Ahh6,
    Ahh7,
    Ahh8,
    Ahh9,
    Ahh10,
    Haa1,
    Weirdchamp,
    Scream1,
    Scream2,
    Scream3,
    Scream4,
    Scream5,
    Scream6,
    Scream7,
    Scream8,
    Gulp,
    Slurp1,
    Slurp2,
    Slurp3,
    ThirstQuenched,
}

/**
 * A type of sound.
 */
export enum SoundType {
    Music,
    SFX,
}

/**
 * Configuration options for a `Sound`.
 */
export interface SoundConfig {
    /** The source of the audio file. */
    src: string;
    /** The type of the sound. */
    type: SoundType;
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
        type: SoundType.Music,
        persistent: true,
        options: { loop: true },
    },
    [Sound.Coin1]: {
        src: clicker.coin1,
        type: SoundType.SFX,
        options: { volume: 0.25 },
    },
    [Sound.Coin2]: {
        src: clicker.coin2,
        type: SoundType.SFX,
        options: { volume: 0.25 },
    },
    [Sound.FuyonadeFull]: {
        src: clicker.fuyonadeFull,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Kaching]: {
        src: kaching,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch1]: {
        src: repro.smooch1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch2]: {
        src: repro.smooch2,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch3]: {
        src: repro.smooch3,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch4]: {
        src: repro.smooch4,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch5]: {
        src: repro.smooch5,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Smooch6]: {
        src: repro.smooch6,
        type: SoundType.SFX,
        options: { volume: 0.6 },
    },
    [Sound.Alien1]: {
        src: lanes.alien1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Astronaut1]: {
        src: lanes.astronaut1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.AutoClicker1]: {
        src: lanes.autoClicker1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Blacksmith1]: {
        src: lanes.blacksmith1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Cultist1]: {
        src: lanes.cultist1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Diver1]: {
        src: lanes.diver1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Diver2]: {
        src: lanes.diver2,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Engineer1]: {
        src: lanes.engineer1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Generico1]: {
        src: lanes.generico1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Hazmat1]: {
        src: lanes.hazmat1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Investor1]: {
        src: lanes.investor1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Knight1]: {
        src: lanes.knight1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Lumberjack1]: {
        src: lanes.lumberjack1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Mechanic1]: {
        src: lanes.mechanic1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Miner1]: {
        src: lanes.miner1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Peak1]: {
        src: lanes.peak1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Scientist1]: {
        src: lanes.scientist1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Wizard1]: {
        src: lanes.wizard1,
        type: SoundType.SFX,
        options: { volume: 0.2 },
    },
    [Sound.Ahh1]: {
        src: clicker.boosts.fuyonade.ahh1,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh2]: {
        src: clicker.boosts.fuyonade.ahh2,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh3]: {
        src: clicker.boosts.fuyonade.ahh3,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh4]: {
        src: clicker.boosts.fuyonade.ahh4,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh5]: {
        src: clicker.boosts.fuyonade.ahh5,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh6]: {
        src: clicker.boosts.fuyonade.ahh6,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh7]: {
        src: clicker.boosts.fuyonade.ahh7,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh8]: {
        src: clicker.boosts.fuyonade.ahh8,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh9]: {
        src: clicker.boosts.fuyonade.ahh9,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Ahh10]: {
        src: clicker.boosts.fuyonade.ahh10,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Haa1]: {
        src: clicker.boosts.fuyonade.haa1,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Weirdchamp]: {
        src: clicker.boosts.fuyonade.weirdchamp,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream1]: {
        src: species.scream1,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream2]: {
        src: species.scream2,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream3]: {
        src: species.scream3,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream4]: {
        src: species.scream4,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream5]: {
        src: species.scream5,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream6]: {
        src: species.scream6,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream7]: {
        src: species.scream7,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Scream8]: {
        src: species.scream8,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Gulp]: {
        src: clicker.boosts.fuyonade.gulp,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Slurp1]: {
        src: clicker.boosts.fuyonade.slurp1,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Slurp2]: {
        src: clicker.boosts.fuyonade.slurp2,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.Slurp3]: {
        src: clicker.boosts.fuyonade.slurp3,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
    [Sound.ThirstQuenched]: {
        src: clicker.boosts.fuyonade.thirstQuenched,
        type: SoundType.SFX,
        options: { volume: 1 },
    },
};

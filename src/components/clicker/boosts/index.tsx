import cx from "classix";
import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { BoostType } from "./data";
import { useEffect, useRef } from "react";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";

/**
 * Sound effects to play when activating the boost.
 */
const ACTIVATION_SOUNDS = [
    Sound.Ahh1,
    Sound.Ahh2,
    Sound.Ahh3,
    Sound.Ahh4,
    Sound.Ahh5,
    Sound.Ahh6,
    Sound.Ahh7,
    Sound.Ahh8,
    Sound.Ahh9,
    Sound.Ahh10,
    Sound.Haa1,
    Sound.Weirdchamp,
];

export default function Fuyonade() {
    const fuyonade = useGameStore(
        state => state.boosts.types[BoostType.FUYONADE]
    );
    const activate = useGameStore(state => state.boosts.activate);
    const filled = useRef<boolean>(false);
    const audio = useAudio();

    /**
     * Track when filled and play a sound effect.
     */
    useEffect(() => {
        if (filled.current) {
            if (fuyonade.active && fuyonade.progress < 1) {
                filled.current = false;
            }
            return;
        }
        if (fuyonade.progress < 1) return;

        void audio.play(Sound.FuyonadeFull);
        filled.current = true;
    }, [audio, fuyonade.progress, fuyonade.active]);

    /**
     * Activates the boost.
     */
    const handleActivate = () => {
        activate(BoostType.FUYONADE);
        void audio.play(
            ACTIVATION_SOUNDS[
                Math.floor(Math.random() * ACTIVATION_SOUNDS.length)
            ]
        );
    };

    return (
        <div>
            <div
                className={classes.fuyonade}
                style={{
                    height: `${fuyonade.progress * 100}%`,
                }}
            />
            <div
                className={cx(
                    classes.overlay,
                    fuyonade.active && classes.active
                )}
            />
            <div className={classes.controls}>
                {!fuyonade.active && fuyonade.progress >= 1 && (
                    <button
                        className={classes.spill}
                        onClick={handleActivate}
                    />
                )}
            </div>
        </div>
    );
}

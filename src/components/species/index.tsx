import { useGameStore } from "@/stores/game";
import { useEffect, useState } from "react";
import classes from "./index.module.css";
import { useTransition } from "react-transition-state";
import cx from "classix";
import * as speciesImages from "@/assets/images/species";
import { Sound } from "@/utils/audio/sounds";
import { useSettingsStore } from "@/stores/settings";

const SPECIES = [
    speciesImages.boobfa,
    speciesImages.buffill,
    speciesImages.hopple,
    speciesImages.jombob,
    speciesImages.peak,
    speciesImages.pablo,
];

const SCREAMS = [
    Sound.Scream1,
    Sound.Scream2,
    Sound.Scream3,
    Sound.Scream4,
    Sound.Scream5,
    Sound.Scream6,
    Sound.Scream7,
    Sound.Scream8,
];

const DISAPPEAR_TIME_MS = 120e3;
const SPECIES_SIZE_PX = 160;

interface Position {
    x: number;
    y: number;
}

export function Species() {
    const species = useGameStore(state => state.species);
    const [speciesIndex, setSpeciesIndex] = useState<number | null>(null);
    const [position, setPosition] = useState<Position | null>(null);
    const [transitionState, toggle] = useTransition({
        timeout: 1e3,
        preEnter: true,
    });
    const play = useSettingsStore(settings => settings.audio.play);

    useEffect(() => {
        // Only run when spawn queued and active element exited.
        if (!species.spawn || transitionState.status !== "exited") return;

        setPosition({
            x: Math.random() * (window.innerWidth - SPECIES_SIZE_PX),
            y: Math.random() * (window.innerHeight - SPECIES_SIZE_PX),
        });
        setSpeciesIndex(Math.floor(Math.random() * SPECIES.length));
        toggle(true);

        // Make element disappear after certain time.
        setTimeout(() => {
            toggle(false);
        }, DISAPPEAR_TIME_MS);
    }, [species.spawn, transitionState.status]);

    /**
     * Handles activation of the species.
     */
    const handleActivate = () => {
        // Only activate if entered and not any other state (e.g. `exiting`.)
        if (transitionState.status !== "entered") return;
        species.activate();
        void play(SCREAMS[Math.floor(Math.random() * SCREAMS.length)]);
        toggle(false);
    };

    return (
        <div className={classes.species}>
            <button
                className={cx(
                    classes.specimen,
                    classes[transitionState.status]
                )}
                style={{
                    left: `${position?.x ?? 0}px`,
                    top: `${position?.y ?? 0}px`,
                }}
                onClick={handleActivate}
            >
                <img src={SPECIES[speciesIndex ?? 0]} />
            </button>
        </div>
    );
}

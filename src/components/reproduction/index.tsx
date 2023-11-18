/* eslint-disable react-refresh/only-export-components */
import { useGameStore } from "@/stores/game";
import { HTMLProps, forwardRef } from "react";
import { useCounter } from "@/hooks/useCounter";
import cx from "classix";
import { formatNumber } from "@/utils/numbers";
import { Sound } from "@/utils/audio/sounds";
import { useSoundEmitter } from "@/hooks/useSoundEmitter";
import { useSettingsStore } from "@/stores/settings";

import { Partners } from "./partners";
import { Hero } from "./hero";
import { Upgrade } from "./upgrade";
import classes from "./index.module.css";

export const SMOOCHES = [
    Sound.Smooch1,
    Sound.Smooch2,
    Sound.Smooch3,
    Sound.Smooch4,
    Sound.Smooch5,
    Sound.Smooch6,
];

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export const Reproduction = forwardRef<
    HTMLDivElement,
    HTMLProps<HTMLDivElement>
>(function Reproduction(props, ref) {
    const amount = useGameStore(state => state.repro.clovers.amount);
    const rateMs = useGameStore(state => state.repro.clovers.rateMs);
    const click = useGameStore(state => state.repro.click);
    const { counterRef: cloverCounterRef } = useCounter({
        value: amount,
        rateMs,
        floor: true,
    });
    const play = useSettingsStore(settings => settings.audio.play);

    const audioRatio = Math.min(rateMs / 1, 1);
    useSoundEmitter({
        sounds: SMOOCHES,
        intervalRangeMs: [20e3 - audioRatio * 10e3, 40e3 - audioRatio * 20e3],
        enabled: true,
    });

    const handleClick = () => {
        void play(SMOOCHES[Math.floor(Math.random() * SMOOCHES.length)]);
        click();
    };

    return (
        <div
            {...props}
            ref={ref}
            className={cx(classes.reproduction, props.className)}
        >
            <Partners />
            <header>
                <h1>Reproduction</h1>
                <h2>
                    Clovers: <span ref={cloverCounterRef} />
                </h2>
                <h2>Per second: {formatNumber(rateMs * 1e3)}</h2>
            </header>
            <div className={classes.couch} />
            <Hero />
            <div className={classes.clover}>
                <button onClick={handleClick} />
            </div>
            <Upgrade />
        </div>
    );
});

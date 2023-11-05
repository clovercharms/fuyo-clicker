import { useGameStore } from "@/store";
import classes from "./index.module.css";
import { HTMLProps } from "react";
import { useCounter } from "@/hooks/useCounter";
import cx from "classix";
import { formatNumber } from "@/utils/numbers";
import { useAudio } from "@/context/audio";
import { Sound } from "@/context/audio/sounds";
import { Partners } from "./partners";
import { Hero } from "./hero";
import { Upgrade } from "./upgrade";

const SMOOCHES = [
    Sound.Smooch1,
    Sound.Smooch2,
    Sound.Smooch3,
    Sound.Smooch4,
    Sound.Smooch5,
];

/**
 * Spawning area for Clovers, ready to be assigned.
 */
export default function Reproduction(props: HTMLProps<HTMLDivElement>) {
    const amount = useGameStore(state => state.repro.clovers.amount);
    const rateMs = useGameStore(state => state.repro.clovers.rateMs);
    const click = useGameStore(state => state.repro.click);
    const audio = useAudio();

    const { counterRef: cloverCounterRef } = useCounter(amount, rateMs, true);

    const handleClick = () => {
        audio.play(SMOOCHES[Math.floor(Math.random() * SMOOCHES.length)]);
        click();
    };

    return (
        <div {...props} className={cx(classes.reproduction, props.className)}>
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
}

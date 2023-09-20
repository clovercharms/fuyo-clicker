import classes from "./index.module.css";
import ping from "../../assets/audio/ping-82822.mp3";
import { CSSProperties, HTMLProps, MouseEvent } from "react";
import { useGameStore } from "../../store";
import { useCounter } from "../../hooks/counter";
import hand from "../../assets/images/hand.png";
import { useClickerHands } from "./clickers";

/**
 * The Clicker component contains the main coin, the current stats, and any
 * other additional effects that may be part of the coin.
 */
export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const coins = useGameStore(state => state.coins);
    const { counterRef } = useCounter(coins.amount, coins.rateMs);
    const { clickerRefs, handRefs } = useClickerHands(coins);

    /**
     * Handles the main coin click, currently on updates a simple counter for
     * demonstration purposes.
     */
    const handleClick = (event: MouseEvent) => {
        if (event.button !== 0) return;

        coins.click();

        void new Audio(ping).play();
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <header>
                <h1>
                    You have <span ref={counterRef} /> coins!
                </h1>
                <h2>Per second: {(coins.rateMs * 1000).toFixed(1)}</h2>
            </header>
            <div className={classes.cookie}>
                {new Array(coins.clickers).fill(undefined).map((_, i) => (
                    <div
                        key={i}
                        style={
                            {
                                "--index": i,
                                /* 360deg / var(--angle-diff) */
                                "--ring": Math.floor(i / (360 / 5)),
                            } as CSSProperties
                        }
                        className={classes.clicker}
                        ref={e => (clickerRefs.current[i] = e!)}
                    >
                        <img src={hand} ref={e => (handRefs.current[i] = e!)} />
                    </div>
                ))}
                <button className={classes.button} onMouseUp={handleClick} />
            </div>
        </div>
    );
}

import classes from "./index.module.css";
import ping from "../../assets/audio/ping-82822.mp3";
import { HTMLProps, MutableRefObject, useRef, useState } from "react";

/**
 * The Clicker component contains the main coin, the current stats, and any
 * other additional effects that may be part of the coin.
 */
export default function Clicker(props: HTMLProps<HTMLDivElement>) {
    const [coins, setCoins] = useState(0);
    const audioRef = useRef() as MutableRefObject<HTMLAudioElement>;

    /**
     * Handles the main coin click, currently on updates a simple counter for
     * demonstration purposes.
     */
    const handleClick = (event: MouseEvent) => {
        if (event.button !== 0) return;
        
        setCoins(coins => coins + 1);

        // Clone audio node in order to allow for overlapping audio.
        const clone = audioRef.current.cloneNode() as HTMLAudioElement;
        void clone.play();
        clone.addEventListener("ended", () => clone.remove());
    };

    return (
        <div
            {...props}
            className={[props.className, classes.container].join(" ")}
        >
            <header>
                <h1>You have {coins} coins!</h1>
                <h2>Per second: 0</h2>
            </header>
            <button className={classes.button} onMouseUp={handleClick} />
            <audio ref={audioRef} src={ping} />
        </div>
    );
}
